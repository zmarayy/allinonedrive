const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// For production, use service account key file
// For now, we'll use environment variables
if (!admin.apps.length) {
  try {
    // Option 1: Use service account (recommended for production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } 
    // Option 2: For production, require service account key (no fallback)
    else {
      throw new Error('Firebase Admin not configured. FIREBASE_SERVICE_ACCOUNT_KEY is required for production.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

const db = admin.firestore();

module.exports = { admin, db };

