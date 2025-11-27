const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');

async function generateTestCode() {
  try {
    const email = 'test@allinonedrive.com';
    const packageType = 'ultimate_pro';
    
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
      metadata: { test: true }
    };

    await db.collection('codes').add(codeData);

    console.log('\n✅ Access Code Generated Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('📦 Package: Ultimate Pro');
    console.log('🔑 Access Code:', code);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now use this code to login to the PWA!');
    console.log('Go to: http://localhost:3000/access-code');
    console.log('Enter the code:', code);
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating code:', error.message);
    process.exit(1);
  }
}

generateTestCode();
