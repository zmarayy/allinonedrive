const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Package prices in pence (GBP)
 * Update these to match your actual pricing
 */
const PACKAGE_PRICES = {
  standard: 2499,              // £24.99
  elite_self_study: 3999,      // £39.99
  elite_live_support: 13999,   // £139.99
  driving_theory_full: 287500, // £2,875.00
  complete: 287500             // £2,875.00 (legacy - same as driving_theory_full)
};

/**
 * Package display names
 */
const PACKAGE_NAMES = {
  standard: 'Standard Package',
  elite_self_study: 'Elite Self-Study',
  elite_live_support: 'Elite Live Support',
  driving_theory_full: 'Driving + Theory Full Package',
  complete: 'Complete Package - From Nothing to Full UK License'
};

/**
 * Create a Stripe checkout session
 * POST /api/checkout/create-session
 * 
 * Body:
 * {
 *   "package": "standard" | "elite_self_study" | "elite_live_support" | "driving_theory_full",
 *   "email": "customer@example.com"
 * }
 */
router.post('/create-session', async (req, res) => {
  try {
    const { package: packageType, email } = req.body;

    // Validate package type
    if (!PACKAGE_PRICES[packageType]) {
      return res.status(400).json({
        error: 'Invalid package type',
        message: `Package must be one of: ${Object.keys(PACKAGE_PRICES).join(', ')}`
      });
    }

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'A valid email address is required'
      });
    }

    // Get amount - use provided amount or package price
    const amount = req.body.amount || PACKAGE_PRICES[packageType];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `${PACKAGE_NAMES[packageType]} - All In One Drive`,
            description: packageType === 'complete' 
              ? 'Complete end-to-end service from start to finish'
              : `Access code for ${PACKAGE_NAMES[packageType]}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/packages`,
      metadata: {
        package: packageType, // This is used by the webhook to determine package type
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message
    });
  }
});

module.exports = router;

