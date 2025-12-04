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

    // Check if code has expired - Accurate date comparison
    const now = new Date();
    const expiresAt = codeData.expiresAt ? new Date(codeData.expiresAt) : null;
    
    // Accurate expiration check: code expires if current time is >= expiration time
    if (expiresAt && now >= expiresAt) {
      // Calculate how long the code was valid for (for better error message)
      const createdAt = codeData.createdAt ? new Date(codeData.createdAt) : null;
      const durationMs = createdAt ? expiresAt.getTime() - createdAt.getTime() : null;
      const durationDays = durationMs ? Math.round(durationMs / (1000 * 60 * 60 * 24)) : null;
      const durationText = durationDays === 1 ? '1 day' : durationDays ? `${durationDays} days` : 'the specified period';
      
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code expired',
          message: `This access code has expired. The code was valid for ${durationText} from purchase.`,
          expired: true,
          expiresAt: expiresAt.toISOString(),
          createdAt: createdAt ? createdAt.toISOString() : null
        })
      };
    }

    // STRICT IP LOCK VALIDATION - One code = One device (IP address)
    // BUT: Same device can login/logout multiple times with same code
    // AND: Same device can use different codes (user buys multiple packages)
    const lockedIp = codeData.lockedIp; // Only check lockedIp (permanent lock)
    
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

    // If code is already locked to a DIFFERENT IP, reject (different device trying to use same code)
    if (lockedIp && lockedIp !== ipAddress) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Code already in use',
          message: 'This access code is already in use on another device. Each access code can only be used on one device. Please contact support if you need to transfer access to a new device.',
          ipLocked: true
        })
      };
    }

    // If code is NOT locked yet (first verification), lock it to this IP permanently
    if (!lockedIp) {
      // FIRST TIME USE - Lock permanently to this IP
      await db.collection('codes').doc(codeDocId).update({
        lockedIp: ipAddress, // Permanent lock - this code is now tied to this IP forever
        lastVerifiedIp: ipAddress,
        lastVerifiedAt: now.toISOString(),
        firstVerifiedAt: now.toISOString(),
        verificationCount: (codeData.verificationCount || 0) + 1
      });
    } else if (lockedIp === ipAddress) {
      // SAME IP (same device) - Allow access (user can login/logout multiple times)
      // This allows: same device + same code = unlimited logins
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

