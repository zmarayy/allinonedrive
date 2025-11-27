const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy to get real client IP (important for IP locking)
app.set('trust proxy', true);

// Middleware
app.use(cors());

// Stripe webhook route must be before express.json() middleware
// It needs raw body for signature verification
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), require('./routes/stripe').webhookHandler);

// JSON body parser for all other routes
app.use(express.json());

// Stripe routes (other than webhook)
app.use('/api/stripe', require('./routes/stripe'));

// Routes
app.use('/api', require('./routes/codes'));
app.use('/api/checkout', require('./routes/checkout'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'All In One Drive API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.STRIPE_SECRET_KEY) {
    console.log(`💳 Stripe webhook endpoint: http://localhost:${PORT}/api/stripe/webhook`);
  }
});

