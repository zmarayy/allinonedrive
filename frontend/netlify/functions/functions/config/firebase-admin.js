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
    // Option 2: Use individual environment variables
    else if (process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
        // Note: For production, use service account key file
        // This is a fallback for development
      });
    } else {
      throw new Error('Firebase Admin not configured. Please set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

const db = admin.firestore();

module.exports = { admin, db };

