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

    // IP LOCK VALIDATION - Strict one-device enforcement
    // Each code can ONLY be used on ONE device (IP address)
    const lastVerifiedIp = codeData.lastVerifiedIp;
    const lockedIp = codeData.lockedIp || lastVerifiedIp; // Use lockedIp if set, otherwise lastVerifiedIp
    
    // If IP is unknown, reject (can't lock to unknown IP)
    if (ipAddress === 'unknown' || !ipAddress) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'IP detection failed',
          message: 'Unable to detect your device. Please try again or contact support.',
          ipLocked: false
        })
      };
    }

    // If code is already locked to a different IP, reject
    if (lockedIp && lockedIp !== ipAddress) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code already in use',
          message: 'This access code is already in use on another device. Each access code can only be used on one device. Please contact support if you need to transfer access to a new device.',
          ipLocked: true,
          lockedToIp: lockedIp
        })
      };
    }

    // If this is the FIRST verification, lock it to this IP immediately
    if (!lockedIp) {
      // First time use - lock it to this IP permanently
      await db.collection('codes').doc(codeDocId).update({
        lockedIp: ipAddress, // Permanent lock
        lastVerifiedIp: ipAddress,
        lastVerifiedAt: now.toISOString(),
        verificationCount: (codeData.verificationCount || 0) + 1,
        firstVerifiedAt: now.toISOString()
      });
    } else if (lockedIp === ipAddress) {
      // Same IP - allow access and update last verified time
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

