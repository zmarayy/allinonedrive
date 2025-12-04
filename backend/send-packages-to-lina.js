require('dotenv').config();
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

// The 4 main packages to send
const PACKAGES = [
  'standard',
  'elite_self_study',
  'elite_live_support',
  'ultimate_pro'
];

const EMAIL = 'linawahidi21@gmail.com';

async function sendPackagesToLina() {
  console.log('🚀 Sending All Package Emails');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Recipient: ${EMAIL}`);
  console.log(`📦 Packages: ${PACKAGES.join(', ')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const packageType of PACKAGES) {
    try {
      console.log(`📦 Processing: ${packageType}`);

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

      // Calculate expiration date (1 month from now - production-like)
      const createdAt = new Date();
      const expiresAt = new Date(createdAt);
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      // Save to Firestore
      const codeData = {
        code,
        email: EMAIL,
        package: packageType,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        lastVerifiedIp: null,
        verificationCount: 0,
        metadata: { 
          test: true, 
          testDate: new Date().toISOString(),
          purpose: 'Email template testing'
        }
      };

      const docRef = await db.collection('codes').add(codeData);
      console.log(`  ✅ Code generated: ${code} (ID: ${docRef.id})`);

      // Send email
      try {
        const emailResult = await sendAccessCodeEmail(EMAIL, code, packageType);
        console.log(`  ✅ Email sent successfully`);
        console.log(`     Email ID: ${emailResult?.id || 'N/A'}`);
        
        results.push({
          package: packageType,
          email: EMAIL,
          code: code,
          docId: docRef.id,
          emailId: emailResult?.id,
          status: 'success',
          expiresAt: expiresAt.toISOString()
        });
        successCount++;
      } catch (emailError) {
        console.error(`  ❌ Email failed:`, emailError.message);
        results.push({
          package: packageType,
          email: EMAIL,
          code: code,
          docId: docRef.id,
          status: 'email_failed',
          error: emailError.message
        });
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`  ❌ Error processing ${packageType}:`, error.message);
      results.push({
        package: packageType,
        email: EMAIL,
        status: 'failed',
        error: error.message
      });
      errorCount++;
    }
  }

  // Summary
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('\n📋 Codes Generated:');
  console.log('─'.repeat(50));
  
  results.forEach((result, index) => {
    if (result.status === 'success') {
      console.log(`\n${index + 1}. ${result.package}`);
      console.log(`   Code: ${result.code}`);
      console.log(`   Expires: ${new Date(result.expiresAt).toLocaleString()}`);
      console.log(`   Email ID: ${result.emailId || 'N/A'}`);
    } else {
      console.log(`\n${index + 1}. ${result.package}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ COMPLETED!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n💡 Check ${EMAIL} inbox (and spam folder) for 4 emails!\n`);

  process.exit(errorCount > 0 ? 1 : 0);
}

sendPackagesToLina().catch((error) => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});

