require('dotenv').config();
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

const EMAIL = 'linawahidi21@gmail.com';
const PACKAGE_TYPE = 'elite_self_study';
const NUMBER_OF_CODES = 4;
const EXPIRATION_DAYS = 7; // 1 week

async function generateEliteCodes() {
  console.log('🚀 Generating Elite Access Codes');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email: ${EMAIL}`);
  console.log(`📦 Package: ${PACKAGE_TYPE}`);
  console.log(`🔢 Number of Codes: ${NUMBER_OF_CODES}`);
  console.log(`⏰ Expiration: ${EXPIRATION_DAYS} days (1 week)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= NUMBER_OF_CODES; i++) {
    try {
      console.log(`\n📝 Generating Code ${i}/${NUMBER_OF_CODES}...`);

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

      // Calculate expiration date (1 week from now)
      const createdAt = new Date();
      const expiresAt = new Date(createdAt);
      expiresAt.setDate(expiresAt.getDate() + EXPIRATION_DAYS); // Add 7 days

      // Save to Firestore with proper structure for IP locking
      const codeData = {
        code,
        email: EMAIL,
        package: PACKAGE_TYPE,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        lockedIp: null, // Will be set to first verification IP (client device)
        lastVerifiedIp: null, // Will be set when code is first verified
        verificationCount: 0,
        metadata: { 
          generatedBy: 'generate-4-elite-codes.js',
          expirationDays: EXPIRATION_DAYS,
          generatedAt: new Date().toISOString()
        }
      };

      const docRef = await db.collection('codes').add(codeData);
      console.log(`  ✅ Code generated: ${code} (ID: ${docRef.id})`);
      console.log(`  📅 Created: ${createdAt.toLocaleString()}`);
      console.log(`  ⏰ Expires: ${expiresAt.toLocaleString()} (${EXPIRATION_DAYS} days)`);

      // Send email (with delay to avoid rate limits)
      try {
        // Add delay between emails (Resend allows 2 requests per second)
        if (i > 1) {
          console.log(`  ⏳ Waiting 1 second before sending email (rate limit)...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
        
        await sendAccessCodeEmail(EMAIL, code, PACKAGE_TYPE);
        console.log(`  📧 Email sent successfully`);
        
        results.push({
          success: true,
          code,
          docId: docRef.id,
          createdAt: createdAt.toISOString(),
          expiresAt: expiresAt.toISOString()
        });
        successCount++;
      } catch (emailError) {
        console.error(`  ❌ Failed to send email:`, emailError.message);
        // Code is still saved, so mark as partial success
        results.push({
          success: false,
          code,
          docId: docRef.id,
          error: `Code saved but email failed: ${emailError.message}`,
          createdAt: createdAt.toISOString(),
          expiresAt: expiresAt.toISOString()
        });
        errorCount++;
      }

    } catch (error) {
      console.error(`  ❌ Error generating code ${i}:`, error.message);
      results.push({
        success: false,
        error: error.message
      });
      errorCount++;
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Successful: ${successCount}/${NUMBER_OF_CODES}`);
  console.log(`❌ Errors: ${errorCount}/${NUMBER_OF_CODES}`);
  console.log('\n📋 Generated Codes:');
  results.forEach((result, index) => {
    if (result.code) {
      console.log(`  ${index + 1}. ${result.code} - ${result.success ? '✅ Email sent' : '⚠️ Code saved, email failed'}`);
      console.log(`     Expires: ${new Date(result.expiresAt).toLocaleString()}`);
    } else {
      console.log(`  ${index + 1}. ❌ Failed: ${result.error}`);
    }
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 IMPORTANT NOTES:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('• Each code will lock to the FIRST device (IP) that uses it');
  console.log('• Same device can login/logout multiple times with the same code');
  console.log('• Same device can use different codes (multiple packages)');
  console.log('• Different devices CANNOT use the same code');
  console.log('• Codes expire in exactly 7 days (1 week)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  process.exit(errorCount > 0 ? 1 : 0);
}

generateEliteCodes().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

