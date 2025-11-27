# Stripe Integration Setup

This guide will help you set up Stripe payment processing with automatic access code generation.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Your backend server running
3. Stripe CLI installed (for local webhook testing)

## Step 1: Install Stripe Package

The Stripe package is already added to `package.json`. Install dependencies:

```bash
cd backend
npm install
```

## Step 2: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** > **API keys**
3. Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)
4. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)

## Step 3: Pricing Configuration

**No need to create products in Stripe!** Pricing is handled directly in your application code.

When creating a checkout session, you'll pass:
- The amount (in pence/cents)
- The package type in metadata

See the example below for how to create checkout sessions.

## Step 4: Set Up Webhook Endpoint

### For Production:

1. Go to **Developers** > **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded` (optional)
5. Copy the **Signing secret** (starts with `whsec_`)

### For Local Development (using Stripe CLI):

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```
4. Copy the webhook signing secret shown in the terminal (starts with `whsec_`)

## Step 5: Configure Environment Variables

Create or update your `.env` file in the `backend` directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

```

Replace all placeholder values with your actual keys.

**Note:** No price IDs needed - pricing is handled in your application code!

## Step 6: Test the Integration

### Test Webhook Locally:

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. In another terminal, forward Stripe webhooks:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```

3. Trigger a test event:
   ```bash
   stripe trigger checkout.session.completed
   ```

4. Check your server logs - you should see:
   - ✅ Checkout session completed
   - 📦 Generating access code
   - ✅ Access code email sent

### Test with Real Checkout:

1. Create a test checkout session using Stripe API or your frontend
2. Complete the payment
3. The webhook will automatically:
   - Generate an access code
   - Store it in Firestore
   - Send it via email to the customer

## How It Works

1. **Customer completes payment** → Stripe creates a checkout session
2. **Stripe sends webhook** → `checkout.session.completed` event
3. **Backend receives webhook** → Verifies signature
4. **Backend processes event** → 
   - Retrieves customer email and package type
   - Generates unique access code
   - Stores code in Firestore
   - Sends access code email via Resend
5. **Customer receives email** → With access code to use in the app

## Troubleshooting

### Webhook signature verification fails:
- Make sure `STRIPE_WEBHOOK_SECRET` matches the signing secret from Stripe
- For local testing, use the secret from `stripe listen` command
- For production, use the secret from your webhook endpoint in Stripe Dashboard

### Access code not generated:
- Check server logs for errors
- Verify Firebase Admin SDK is configured correctly
- Ensure you're passing `metadata: { package: 'standard' | 'elite' | 'pro' | 'ultimate_pro' }` when creating checkout sessions

### Email not sent:
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for email delivery status
- Access code is still generated even if email fails

## Security Notes

- Never commit `.env` file to version control
- Use test keys (`sk_test_`, `pk_test_`) for development
- Switch to live keys (`sk_live_`, `pk_live_`) only in production
- Webhook signature verification prevents unauthorized requests
- Keep your webhook secret secure

## Creating Checkout Sessions

When creating a checkout session in your application, pass the package type in metadata:

### Example (Node.js/Express):

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Package prices (in pence for GBP)
const packagePrices = {
  standard: 2499,      // £24.99
  elite: 3999,         // £39.99
  pro: 13999,          // £139.99
  ultimate_pro: 19999  // £199.99
};

async function createCheckoutSession(packageType, customerEmail) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `${getPackageDisplayName(packageType)} - All In One Drive`,
        },
        unit_amount: packagePrices[packageType],
      },
      quantity: 1,
    }],
    mode: 'payment',
    customer_email: customerEmail,
    success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yourdomain.com/cancel',
    metadata: {
      package: packageType, // This is what the webhook uses!
    },
  });

  return session;
}
```

### Example (Frontend with Stripe.js):

```javascript
// In your frontend, create a checkout session via your backend API
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    package: 'ultimate_pro', // 'standard', 'elite', 'pro', or 'ultimate_pro'
    email: 'customer@example.com'
  })
});

const { sessionId } = await response.json();

// Redirect to Stripe Checkout
const stripe = Stripe('pk_test_your_publishable_key');
stripe.redirectToCheckout({ sessionId });
```

## Next Steps

- Create a backend endpoint to create checkout sessions
- Integrate Stripe Checkout in your frontend
- Set up success/cancel pages
- Add error handling and retry logic
- Monitor webhook events in Stripe Dashboard

