# Netlify Functions Setup Guide

## ✅ What's Been Done

I've converted your Express backend to **Netlify Functions** so everything runs on Netlify!

## 📁 Structure

```
frontend/
  netlify/
    functions/
      verify-code.js          # Verify access codes
      create-session.js       # Create Stripe checkout
      stripe-webhook.js       # Handle Stripe webhooks
      config/
        firebase-admin.js     # Firebase setup
      utils/
        codeGenerator.js      # Code generation
        emailService.js       # Email sending
      package.json            # Dependencies
```

## 🔧 Next Steps

### 1. Add Environment Variables in Netlify

Go to **Netlify Dashboard** → Your PWA Site → **Site settings** → **Environment variables** and add:

```env
# Firebase
FIREBASE_PROJECT_ID=allinonedrive-84e21

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=All In One Drive <linawahidi@allinonedrive.com>

# Frontend URL (for Stripe redirects)
FRONTEND_URL=https://allinonedrive.netlify.app
```

### 2. Set Up Stripe Webhook

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://allinonedrive.netlify.app/.netlify/functions/stripe-webhook`
4. Select events: `checkout.session.completed`
5. Copy the **Signing secret** and add it as `STRIPE_WEBHOOK_SECRET` in Netlify

### 3. Redeploy

After adding environment variables, **redeploy** your site in Netlify.

## 🧪 Testing

After deployment, test with:
- Access code: `FT5IO9W3` (the one we generated earlier)
- Or use dev codes: `DEVSTAND`, `DEVELITE`, etc.

## 📝 How It Works

- **Frontend** calls `/.netlify/functions/verify-code` (automatically detected)
- **Stripe** sends webhooks to `/.netlify/functions/stripe-webhook`
- **Checkout** uses `/.netlify/functions/create-session`

All functions run serverless on Netlify - no separate backend needed!

