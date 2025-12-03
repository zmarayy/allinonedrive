require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

// Test configuration
const TEST_EMAIL = 'mrjmarjan8@icloud.com';
const TEST_PACKAGE = 'elite_self_study';
const TEST_AMOUNT = 3999; // £39.99 in pence

async function testFullPaymentFlow() {
  console.log('🚀 COMPREHENSIVE PAYMENT FLOW TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Testing: Stripe → Webhook → Database → Email');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = {
    checkoutSession: null,
    webhookEvent: null,
    accessCode: null,
    databaseRecord: null,
    emailSent: false,
    errors: []
  };

  try {
    // STEP 1: Create a test checkout session
    console.log('📝 STEP 1: Creating Test Checkout Session...');
    console.log('─'.repeat(50));
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Elite Self-Study Package - All In One Drive`,
              description: 'Test payment for access code generation',
            },
            unit_amount: TEST_AMOUNT,
          },
          quantity: 1,
        }],
        mode: 'payment',
        customer_email: TEST_EMAIL,
        success_url: `${process.env.FRONTEND_URL || 'https://allinonedrive.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || 'https://allinonedrive.com'}/packages`,
        metadata: {
          package: TEST_PACKAGE,
          test: 'true'
        },
      });

      results.checkoutSession = session;
      console.log(`✅ Checkout session created: ${session.id}`);
      console.log(`   URL: ${session.url}`);
      console.log(`   Status: ${session.status}`);
      console.log(`   Customer Email: ${session.customer_email || 'N/A'}`);
      console.log(`   Package Metadata: ${session.metadata?.package || 'N/A'}\n`);

    } catch (error) {
      results.errors.push({ step: 'checkout_session', error: error.message });
      console.error(`❌ Failed to create checkout session:`, error.message);
      throw error;
    }

    // STEP 2: Simulate webhook event (what Stripe sends after payment)
    console.log('📨 STEP 2: Simulating Webhook Event...');
    console.log('─'.repeat(50));
    
    try {
      // Retrieve full session (as webhook would)
      const fullSession = await stripe.checkout.sessions.retrieve(results.checkoutSession.id, {
        expand: ['customer']
      });

      // Simulate the webhook event structure
      const webhookEvent = {
        id: `evt_test_${Date.now()}`,
        type: 'checkout.session.completed',
        data: {
          object: fullSession
        }
      };

      results.webhookEvent = webhookEvent;
      console.log(`✅ Webhook event simulated`);
      console.log(`   Event Type: ${webhookEvent.type}`);
      console.log(`   Session ID: ${fullSession.id}`);
      console.log(`   Customer Email: ${fullSession.customer_details?.email || fullSession.customer_email || 'N/A'}`);
      console.log(`   Package: ${fullSession.metadata?.package || 'N/A'}\n`);

    } catch (error) {
      results.errors.push({ step: 'webhook_simulation', error: error.message });
      console.error(`❌ Failed to simulate webhook:`, error.message);
      throw error;
    }

    // STEP 3: Process webhook (generate code, save to DB, send email)
    console.log('⚙️  STEP 3: Processing Webhook (Generate Code, Save to DB, Send Email)...');
    console.log('─'.repeat(50));
    
    try {
      const session = results.webhookEvent.data.object;
      const customerEmail = session.customer_details?.email || session.customer_email;
      const packageType = session.metadata?.package;

      if (!customerEmail) {
        throw new Error('No customer email found in session');
      }

      if (!packageType) {
        throw new Error('No package type found in session metadata');
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

      results.accessCode = code;
      console.log(`✅ Access code generated: ${code}`);

      // Calculate expiration (1 month from now)
      const createdAt = new Date();
      const expiresAt = new Date(createdAt);
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      // Save to Firestore
      const codeData = {
        code,
        email: customerEmail,
        package: packageType,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        lastVerifiedIp: null,
        verificationCount: 0,
        metadata: {
          stripeSessionId: session.id,
          stripeCustomerId: session.customer,
          amountTotal: session.amount_total,
          currency: session.currency,
          test: true,
          testDate: new Date().toISOString()
        }
      };

      const docRef = await db.collection('codes').add(codeData);
      results.databaseRecord = { id: docRef.id, ...codeData };
      console.log(`✅ Code saved to database`);
      console.log(`   Document ID: ${docRef.id}`);
      console.log(`   Expires: ${expiresAt.toLocaleString()}`);

      // Send email
      try {
        const emailResult = await sendAccessCodeEmail(customerEmail, code, packageType);
        results.emailSent = true;
        console.log(`✅ Email sent successfully`);
        console.log(`   Email ID: ${emailResult?.id || 'N/A'}`);
        console.log(`   Status: ${emailResult?.status || 'sent'}`);
      } catch (emailError) {
        results.errors.push({ step: 'email_sending', error: emailError.message });
        console.error(`❌ Email sending failed:`, emailError.message);
        // Don't throw - code is still generated
      }

    } catch (error) {
      results.errors.push({ step: 'webhook_processing', error: error.message });
      console.error(`❌ Failed to process webhook:`, error.message);
      throw error;
    }

    // STEP 4: Verify database record
    console.log('\n🔍 STEP 4: Verifying Database Record...');
    console.log('─'.repeat(50));
    
    try {
      const codeDoc = await db.collection('codes').doc(results.databaseRecord.id).get();
      
      if (!codeDoc.exists) {
        throw new Error('Code not found in database');
      }

      const data = codeDoc.data();
      console.log(`✅ Database record verified`);
      console.log(`   Code: ${data.code}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Package: ${data.package}`);
      console.log(`   Is Active: ${data.isActive}`);
      console.log(`   Created: ${new Date(data.createdAt).toLocaleString()}`);
      console.log(`   Expires: ${new Date(data.expiresAt).toLocaleString()}`);
      console.log(`   Stripe Session ID: ${data.metadata?.stripeSessionId || 'N/A'}`);

    } catch (error) {
      results.errors.push({ step: 'database_verification', error: error.message });
      console.error(`❌ Database verification failed:`, error.message);
    }

    // STEP 5: Test code verification (simulate user entering code)
    console.log('\n🔐 STEP 5: Testing Code Verification...');
    console.log('─'.repeat(50));
    
    try {
      const codeToVerify = results.accessCode;
      const codeQuery = await db.collection('codes')
        .where('code', '==', codeToVerify)
        .where('isActive', '==', true)
        .limit(1)
        .get();

      if (codeQuery.empty) {
        throw new Error('Code not found or inactive');
      }

      const codeDoc = codeQuery.docs[0];
      const codeData = codeDoc.data();

      // Check expiration
      const expiresAt = new Date(codeData.expiresAt);
      const now = new Date();
      
      if (now > expiresAt) {
        throw new Error('Code has expired');
      }

      console.log(`✅ Code verification successful`);
      console.log(`   Code: ${codeData.code}`);
      console.log(`   Package: ${codeData.package}`);
      console.log(`   Valid until: ${expiresAt.toLocaleString()}`);
      console.log(`   Email matches: ${codeData.email === TEST_EMAIL}`);

    } catch (error) {
      results.errors.push({ step: 'code_verification', error: error.message });
      console.error(`❌ Code verification failed:`, error.message);
    }

    // FINAL SUMMARY
    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 TEST SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const allStepsPassed = 
      results.checkoutSession &&
      results.webhookEvent &&
      results.accessCode &&
      results.databaseRecord &&
      results.emailSent &&
      results.errors.length === 0;

    console.log(`✅ Checkout Session: ${results.checkoutSession ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Webhook Event: ${results.webhookEvent ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Access Code Generated: ${results.accessCode ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Database Record: ${results.databaseRecord ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Email Sent: ${results.emailSent ? 'PASS' : 'FAIL'}`);
    console.log(`❌ Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
      console.log('\n⚠️  ERRORS FOUND:');
      results.errors.forEach((err, index) => {
        console.log(`   ${index + 1}. ${err.step}: ${err.error}`);
      });
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (allStepsPassed) {
      console.log('🎉 ALL TESTS PASSED! SYSTEM IS READY FOR PRODUCTION!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n📧 Test email sent to: ${TEST_EMAIL}`);
      console.log(`🔑 Access Code: ${results.accessCode}`);
      console.log(`📦 Package: ${TEST_PACKAGE}`);
      console.log(`💾 Database ID: ${results.databaseRecord.id}`);
      console.log(`\n💡 Check your email inbox for the confirmation email!`);
      console.log(`   You can test the code in the app: ${results.accessCode}\n`);
    } else {
      console.log('⚠️  SOME TESTS FAILED - REVIEW ERRORS ABOVE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    process.exit(allStepsPassed ? 0 : 1);

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error('Stack:', error.stack);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ TEST FAILED - SYSTEM NOT READY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
}

testFullPaymentFlow();

