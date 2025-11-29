// Netlify Function: Verify Access Code
const { db } = require('./config/firebase-admin');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { code, ipAddress: clientProvidedIp } = JSON.parse(event.body || '{}');

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing code',
          message: 'Access code is required'
        })
      };
    }

    // Get client IP address from Netlify headers
    const clientIp = clientProvidedIp || 
                   event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                   event.headers['client-ip'] ||
                   event.headers['x-real-ip'] ||
                   'unknown';
    const ipAddress = Array.isArray(clientIp) ? clientIp[0] : clientIp.split(',')[0].trim();

    // Normalize code (uppercase, remove spaces)
    const normalizedCode = code.toUpperCase().replace(/\s/g, '');

    // Search for code in Firestore
    const codesSnapshot = await db.collection('codes')
      .where('code', '==', normalizedCode)
      .limit(1)
      .get();

    if (codesSnapshot.empty) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'Invalid code',
          message: 'The access code you entered is invalid or does not exist'
        })
      };
    }

    // Get the code document
    const codeDoc = codesSnapshot.docs[0];
    const codeData = codeDoc.data();
    const codeDocId = codeDoc.id;

    // Check if code is active
    if (codeData.isActive === false) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code deactivated',
          message: 'This access code has been deactivated. Please contact support.'
        })
      };
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = codeData.expiresAt ? new Date(codeData.expiresAt) : null;
    
    if (expiresAt && now > expiresAt) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code expired',
          message: 'This access code has expired. Access codes are valid for 1 month from purchase.',
          expired: true,
          expiresAt: expiresAt.toISOString()
        })
      };
    }

    // IP LOCK VALIDATION - Only one IP can use a code
    const lastVerifiedIp = codeData.lastVerifiedIp;
    
    if (lastVerifiedIp && lastVerifiedIp !== ipAddress && ipAddress !== 'unknown') {
      // Code is already in use by a different IP
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code already in use',
          message: 'This access code is already in use on another device. Each access code can only be used on one device at a time. Please contact support if you need to transfer access.',
          ipLocked: true
        })
      };
    }

    // If this is the first verification or same IP, lock it to this IP
    if (!lastVerifiedIp || lastVerifiedIp === ipAddress || ipAddress === 'unknown') {
      // Update the code document to lock it to this IP
      await db.collection('codes').doc(codeDocId).update({
        lastVerifiedIp: ipAddress,
        lastVerifiedAt: now.toISOString(),
        verificationCount: (codeData.verificationCount || 0) + 1
      });
    }

    // Return package information (without sensitive data)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        valid: true,
        package: codeData.package,
        email: codeData.email,
        createdAt: codeData.createdAt,
        expiresAt: codeData.expiresAt || null,
        ipAddress: ipAddress
      })
    };

  } catch (error) {
    console.error('Error verifying code:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

