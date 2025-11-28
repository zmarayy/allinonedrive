const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db } = require('../config/firebase-admin');
const { generateAccessCode } = require('../utils/codeGenerator');
const { sendAccessCodeEmail } = require('../utils/emailService');

// Stripe webhook endpoint - must be before express.json() middleware
// This route should be mounted with raw body parsing in server.js

/**
 * Handle Stripe webhook events
 * Specifically listens for checkout.session.completed events
 * Note: Raw body parsing is handled in server.js for this route
 */
const webhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      break;
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

/**
 * Handle checkout session completed event
 * Generate access code and send email to customer
 */
async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('✅ Checkout session completed:', session.id);

    // Retrieve the full session object to get metadata
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['customer']
    });

    const customerEmail = fullSession.customer_details?.email || fullSession.customer_email;
    
    if (!customerEmail) {
      console.error('❌ No customer email found in session:', session.id);
      return;
    }

    // Get package type from metadata (set when creating checkout session)
    const packageType = fullSession.metadata?.package || session.metadata?.package;

    if (!packageType) {
      console.error('❌ No package type found in session metadata:', session.id);
      console.error('Session metadata:', fullSession.metadata);
      return;
    }

    // Validate package type
    const validPackages = ['standard', 'elite_self_study', 'elite_live_support', 'driving_theory_full', 'complete', 'accelerator_morning', 'accelerator_evening'];
    if (!validPackages.includes(packageType)) {
      console.error('❌ Invalid package type:', packageType);
      return;
    }

    console.log(`📦 Generating access code for package: ${packageType}, email: ${customerEmail}`);

    // Generate unique code
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure code is unique
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

    // Save to Firestore with IP lock (will be set on first verification)
    // Note: IP address will be set when user first verifies the code
    const codeData = {
      code,
      email: customerEmail,
      package: packageType,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lockedIp: null, // Will be set to first verification IP
      lastVerifiedIp: null, // Will be set when code is first verified
      isActive: true,
      metadata: {
        stripeSessionId: session.id,
        stripeCustomerId: fullSession.customer,
        amountTotal: session.amount_total,
        currency: session.currency
      }
    };

    await db.collection('codes').add(codeData);
    console.log(`✅ Access code generated and saved: ${code}`);

    // Send access code email
    try {
      await sendAccessCodeEmail(customerEmail, code, packageType);
      console.log(`✅ Access code email sent to: ${customerEmail}`);
    } catch (emailError) {
      console.error('❌ Failed to send access code email:', emailError);
      // Don't throw - code is already generated and stored
    }

  } catch (error) {
    console.error('❌ Error handling checkout session completed:', error);
    throw error; // Re-throw to let Stripe retry
  }
}

// Export both the router and the webhook handler
module.exports = router;
module.exports.webhookHandler = webhookHandler;

