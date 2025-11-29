// Netlify Function: Create Stripe Checkout Session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PACKAGE_PRICES = {
  standard: 2499,
  elite_self_study: 3999,
  elite_live_support: 13999,
  driving_theory_full: 287500,
  complete: 329999,
  accelerator_morning: 34999,
  accelerator_evening: 34999
};

const PACKAGE_NAMES = {
  standard: 'Standard Package',
  elite_self_study: 'Elite Self-Study',
  elite_live_support: 'Elite Live Support',
  driving_theory_full: 'Driving + Theory Full Package',
  complete: 'Complete Package - From Nothing to Full UK License',
  accelerator_morning: 'Elite 5-Day Theory Accelerator - Morning Power Session',
  accelerator_evening: 'Elite 5-Day Theory Accelerator - Evening Power Session'
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { package: packageType, email } = JSON.parse(event.body || '{}');

    if (!PACKAGE_PRICES[packageType]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid package type',
          message: `Package must be one of: ${Object.keys(PACKAGE_PRICES).join(', ')}`
        })
      };
    }

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid email',
          message: 'A valid email address is required'
        })
      };
    }

    const requestBody = JSON.parse(event.body || '{}');
    const amount = requestBody.amount || PACKAGE_PRICES[packageType];

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
      success_url: `${process.env.FRONTEND_URL || 'https://allinonedrive.netlify.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://allinonedrive.netlify.app'}/packages`,
      metadata: {
        package: packageType,
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        sessionId: session.id,
        url: session.url
      })
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        message: error.message
      })
    };
  }
};

