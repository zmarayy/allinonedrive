require('dotenv').config();
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

async function testEmailElite() {
  try {
    const email = 'mrjmarjan8@icloud.com';
    const packageType = 'elite_self_study';
    
    console.log('🚀 Testing Email System for Elite Package');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${email}`);
    console.log(`📦 Package: Elite Self-Study`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Generate unique code
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    console.log('🔑 Generating unique access code...');
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

    console.log(`✅ Access code generated: ${code}\n`);

    // Calculate expiration date (1 month from now)
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    // Save to Firestore
    console.log('💾 Saving to database...');
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
        testDate: new Date().toISOString(),
        purpose: 'Email system test'
      }
    };

    const docRef = await db.collection('codes').add(codeData);
    console.log(`✅ Code saved to database (ID: ${docRef.id})\n`);

    // Send email
    console.log('📧 Sending confirmation email...');
    try {
      const emailResult = await sendAccessCodeEmail(email, code, packageType);
      console.log('✅ Email sent successfully!');
      console.log('   Email ID:', emailResult?.id || 'N/A');
      console.log('   Status:', emailResult?.status || 'sent');
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      console.error('   Full error:', emailError);
      throw emailError;
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TEST COMPLETED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📧 Email sent to: ${email}`);
    console.log(`🔑 Access Code: ${code}`);
    console.log(`📦 Package: Elite Self-Study`);
    console.log(`⏰ Expires: ${expiresAt.toLocaleString()}`);
    console.log(`🆔 Document ID: ${docRef.id}`);
    console.log('\n💡 Check your email inbox (and spam folder) for the confirmation email!');
    console.log('   The email should contain your access code and package details.\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED!');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Check that RESEND_API_KEY is set in backend/.env');
    console.error('2. Check that RESEND_FROM_EMAIL is set correctly');
    console.error('3. Verify Firebase connection is working');
    console.error('4. Check Resend API dashboard for email status\n');
    process.exit(1);
  }
}

testEmailElite();

