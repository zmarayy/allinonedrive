const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase-admin');
const { generateAccessCode } = require('../utils/codeGenerator');
const { sendAccessCodeEmail } = require('../utils/emailService');

/**
 * POST /api/generate-code
 * Generate a unique access code and email it to the user
 * 
 * Body (simulated Stripe webhook format):
 * {
 *   "email": "user@example.com",
 *   "package": "driving_theory_full", // standard, elite_self_study, elite_live_support, driving_theory_full
 *   "metadata": { ... } // optional additional data
 * }
 */
router.post('/generate-code', async (req, res) => {
  try {
    const { email, package: packageType, metadata } = req.body;

    // Validation
    if (!email || !packageType) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and package are required'
      });
    }

    // Validate package type
    const validPackages = ['standard', 'elite_self_study', 'elite_live_support', 'driving_theory_full'];
    if (!validPackages.includes(packageType)) {
      return res.status(400).json({
        error: 'Invalid package type',
        message: `Package must be one of: ${validPackages.join(', ')}`
      });
    }

    // Generate unique code
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure code is unique
    while (!isUnique && attempts < maxAttempts) {
      code = generateAccessCode();
      const existingCode = await db.collection('codes').where('code', '==', code).limit(1).get();
      
      if (existingCode.empty) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error('Failed to generate unique code after multiple attempts');
    }

    // Calculate expiration date (1 month from now)
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    // Get client IP address
    const clientIp = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const ipAddress = Array.isArray(clientIp) ? clientIp[0] : clientIp.split(',')[0].trim();

    // Save to Firestore - IP will be locked on first verification (not here)
    const codeData = {
      code,
      email,
      package: packageType,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lockedIp: null, // Will be set to first verification IP (client device)
      lastVerifiedIp: null, // Will be set when code is first verified
      isActive: true,
      verificationCount: 0,
      metadata: metadata || {}
    };

    await db.collection('codes').add(codeData);

    // Send email
    try {
      await sendAccessCodeEmail(email, code, packageType);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - code is still generated
      // In production, you might want to queue the email for retry
    }

    // Return success (don't return the code in response for security)
    res.status(200).json({
      success: true,
      message: 'Access code generated and emailed successfully',
      email: email,
      package: packageType
      // Note: We don't return the code in the response for security
    });

  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * POST /api/verify-code
 * Verify an access code and return package information
 * Enforces IP lock - only one device/IP can use a code
 * 
 * Body:
 * {
 *   "code": "A8D3F1XY",
 *   "ipAddress": "192.168.1.1" // Optional, will use request IP if not provided
 * }
 */
router.post('/verify-code', async (req, res) => {
  try {
    const { code, ipAddress: clientProvidedIp } = req.body;

    if (!code) {
      return res.status(400).json({
        error: 'Missing code',
        message: 'Access code is required'
      });
    }

    // Get client IP address
    const clientIp = clientProvidedIp || req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    const ipAddress = Array.isArray(clientIp) ? clientIp[0] : clientIp.split(',')[0].trim();

    // Normalize code (uppercase, remove spaces)
    const normalizedCode = code.toUpperCase().replace(/\s/g, '');

    // Search for code in Firestore
    const codesSnapshot = await db.collection('codes')
      .where('code', '==', normalizedCode)
      .limit(1)
      .get();

    if (codesSnapshot.empty) {
      return res.status(404).json({
        error: 'Invalid code',
        message: 'The access code you entered is invalid or does not exist'
      });
    }

    // Get the code document
    const codeDoc = codesSnapshot.docs[0];
    const codeData = codeDoc.data();
    const codeDocId = codeDoc.id;

    // Check if code is active
    if (codeData.isActive === false) {
      return res.status(403).json({
        error: 'Code deactivated',
        message: 'This access code has been deactivated. Please contact support.'
      });
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = codeData.expiresAt ? new Date(codeData.expiresAt) : null;
    
    if (expiresAt && now > expiresAt) {
      return res.status(403).json({
        error: 'Code expired',
        message: 'This access code has expired. Access codes are valid for 1 month from purchase.',
        expired: true,
        expiresAt: expiresAt.toISOString()
      });
    }

    // STRICT IP LOCK VALIDATION - One device per code, enforced permanently
    // Reject if IP cannot be determined
    if (ipAddress === 'unknown' || !ipAddress) {
      return res.status(403).json({
        error: 'IP detection failed',
        message: 'Unable to detect your device. Please try again or contact support.',
        ipLocked: false
      });
    }

    // Check if code is already locked to a different IP
    const lockedIp = codeData.lockedIp || codeData.lastVerifiedIp;
    
    if (lockedIp && lockedIp !== ipAddress) {
      // Code is already locked to a different device/IP
      return res.status(403).json({
        error: 'Code already in use',
        message: 'This access code is already in use on another device. Each access code can only be used on one device. Please contact support if you need to transfer access to a new device.',
        ipLocked: true
      });
    }

    // If code is not yet locked, lock it to this IP permanently (first verification)
    if (!lockedIp) {
      // FIRST TIME USE - Lock permanently to this IP
      await db.collection('codes').doc(codeDocId).update({
        lockedIp: ipAddress, // Permanent lock - never changes
        lastVerifiedIp: ipAddress,
        lastVerifiedAt: now.toISOString(),
        firstVerifiedAt: now.toISOString(),
        verificationCount: (codeData.verificationCount || 0) + 1
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
    res.status(200).json({
      success: true,
      valid: true,
      package: codeData.package,
      email: codeData.email,
      createdAt: codeData.createdAt,
      expiresAt: codeData.expiresAt || null,
      ipAddress: ipAddress // Return IP so frontend can store it
    });

  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/test-generate-code
 * Test endpoint to manually trigger code generation (for development)
 * Query params: ?email=user@example.com&package=driving_theory_full
 */
router.get('/test-generate-code', async (req, res) => {
  try {
    const { email, package: packageType } = req.query;

    if (!email || !packageType) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Please provide email and package as query parameters',
        example: '/api/test-generate-code?email=user@example.com&package=driving_theory_full'
      });
    }

    // Reuse the same logic as POST /generate-code
    // Validation
    const validPackages = ['standard', 'elite_self_study', 'elite_live_support', 'driving_theory_full'];
    if (!validPackages.includes(packageType)) {
      return res.status(400).json({
        error: 'Invalid package type',
        message: `Package must be one of: ${validPackages.join(', ')}`
      });
    }

    // Generate unique code
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      code = generateAccessCode();
      const existingCode = await db.collection('codes').where('code', '==', code).limit(1).get();
      
      if (existingCode.empty) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error('Failed to generate unique code after multiple attempts');
    }

    // Calculate expiration date (1 month from now)
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    // Save to Firestore
    const codeData = {
      code,
      email,
      package: packageType,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      metadata: {}
    };

    await db.collection('codes').add(codeData);

    // Send email
    try {
      await sendAccessCodeEmail(email, code, packageType);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    // Return success (include code for testing purposes only)
    res.status(200).json({
      success: true,
      message: 'Access code generated and emailed successfully',
      email: email,
      package: packageType,
      code: code // Include code in test endpoint for verification
    });

  } catch (error) {
    console.error('Error in test endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

module.exports = router;

