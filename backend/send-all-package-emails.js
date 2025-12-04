require('dotenv').config();
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

// The 4 main packages to test
const PACKAGES = [
  'standard',
  'elite_self_study',
  'elite_live_support',
  'ultimate_pro'
];

// Email addresses to send to
const EMAILS = [
  'mrjmarjan8@icloud.com',
  'lina_wahidi@hotmail.com'
];

async function sendAllPackageEmails() {
  console.log('🚀 Sending Test Emails for All Packages');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Recipients: ${EMAILS.join(', ')}`);
  console.log(`📦 Packages: ${PACKAGES.join(', ')}`);
  console.log(`📊 Total Emails: ${PACKAGES.length * EMAILS.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const packageType of PACKAGES) {
    console.log(`\n📦 Processing: ${packageType}`);
    console.log('─'.repeat(50));

    for (const email of EMAILS) {
      try {
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
            purpose: 'Email template testing'
          }
        };

        const docRef = await db.collection('codes').add(codeData);
        console.log(`  ✅ Code generated: ${code} (ID: ${docRef.id})`);

        // Send email
        try {
          const emailResult = await sendAccessCodeEmail(email, code, packageType);
          console.log(`  ✅ Email sent to ${email}`);
          console.log(`     Email ID: ${emailResult?.id || 'N/A'}`);
          
          results.push({
            package: packageType,
            email: email,
            code: code,
            docId: docRef.id,
            emailId: emailResult?.id,
            status: 'success',
            expiresAt: expiresAt.toISOString()
          });
          successCount++;
        } catch (emailError) {
          console.error(`  ❌ Email failed for ${email}:`, emailError.message);
          results.push({
            package: packageType,
            email: email,
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
        console.error(`  ❌ Error processing ${packageType} for ${email}:`, error.message);
        results.push({
          package: packageType,
          email: email,
          status: 'failed',
          error: error.message
        });
        errorCount++;
      }
    }
  }

  // Summary
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📧 Total: ${successCount + errorCount}`);
  console.log('\n📋 Detailed Results:');
  console.log('─'.repeat(50));
  
  results.forEach((result, index) => {
    if (result.status === 'success') {
      console.log(`\n${index + 1}. ${result.package} → ${result.email}`);
      console.log(`   Code: ${result.code}`);
      console.log(`   Expires: ${new Date(result.expiresAt).toLocaleString()}`);
      console.log(`   Email ID: ${result.emailId || 'N/A'}`);
    } else {
      console.log(`\n${index + 1}. ${result.package} → ${result.email}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
    }
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TEST COMPLETED!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💡 Check both email inboxes (and spam folders) for the emails!');
  console.log('   Each email should show the tailored template for that package.\n');

  process.exit(errorCount > 0 ? 1 : 0);
}

sendAllPackageEmails().catch((error) => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});

