// Netlify Function: Stripe Webhook Handler
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('./config/firebase-admin');
const { generateAccessCode } = require('./utils/codeGenerator');
const { sendAccessCodeEmail } = require('./utils/emailService');

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let eventData;

  try {
    // Verify the webhook signature
    // Netlify passes body as string, need to handle it properly
    const body = typeof event.body === 'string' ? event.body : JSON.stringify(event.body);
    eventData = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  // Handle the event
  switch (eventData.type) {
    case 'checkout.session.completed':
      const session = eventData.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', eventData.data.object.id);
      break;
    
    default:
      console.log(`Unhandled event type: ${eventData.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  };
};

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('✅ Checkout session completed:', session.id);

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['customer']
    });

    const customerEmail = fullSession.customer_details?.email || fullSession.customer_email;
    
    if (!customerEmail) {
      console.error('❌ No customer email found in session:', session.id);
      return;
    }

    const packageType = fullSession.metadata?.package || session.metadata?.package;

    if (!packageType) {
      console.error('❌ No package type found in session metadata:', session.id);
      return;
    }

    const validPackages = ['standard', 'elite_self_study', 'elite_live_support', 'driving_theory_full', 'complete', 'accelerator_morning', 'accelerator_evening'];
    if (!validPackages.includes(packageType)) {
      console.error('❌ Invalid package type:', packageType);
      return;
    }

    console.log(`📦 Generating access code for package: ${packageType}, email: ${customerEmail}`);

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

    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const codeData = {
      code,
      email: customerEmail,
      package: packageType,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lockedIp: null, // Will be set to first verification IP (client device)
      lastVerifiedIp: null, // Will be set when code is first verified
      isActive: true,
      verificationCount: 0,
      metadata: {
        stripeSessionId: session.id,
        stripeCustomerId: fullSession.customer,
        amountTotal: session.amount_total,
        currency: session.currency
      }
    };

    await db.collection('codes').add(codeData);
    console.log(`✅ Access code generated and saved: ${code}`);

    try {
      await sendAccessCodeEmail(customerEmail, code, packageType);
      console.log(`✅ Access code email sent to: ${customerEmail}`);
    } catch (emailError) {
      console.error('❌ Failed to send access code email:', emailError);
    }

  } catch (error) {
    console.error('❌ Error handling checkout session completed:', error);
    throw error;
  }
}

