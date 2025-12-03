require('dotenv').config();
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');

async function generateElite24HourCode() {
  try {
    const email = 'elite@allinonedrive.com';
    const packageType = 'elite_self_study'; // Elite package
    
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

    // Calculate expiration date (24 hours from now)
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Save to Firestore
    const codeData = {
      code,
      email,
      package: packageType,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
      lastVerifiedIp: null,
      verificationCount: 0,
      metadata: { 
        test: true, 
        duration: '24_hours',
        generatedAt: createdAt.toISOString()
      }
    };

    const docRef = await db.collection('codes').add(codeData);

    console.log('\n✅ ELITE ACCESS CODE GENERATED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 Package: Elite Self-Study');
    console.log('🔑 Access Code:', code);
    console.log('⏰ Created At:', createdAt.toLocaleString());
    console.log('⏰ Expires At:', expiresAt.toLocaleString());
    console.log('⏱️  Valid For: 24 hours');
    console.log('📧 Email:', email);
    console.log('🆔 Document ID:', docRef.id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📱 Use this code in the app to access Elite package features!');
    console.log('⚠️  Note: This code will expire in exactly 24 hours.');
    console.log('   Current time:', new Date().toLocaleString());
    console.log('   Expires at:', expiresAt.toLocaleString());
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating code:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

generateElite24HourCode();

