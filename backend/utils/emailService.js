const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send access code email to user
 */
const sendAccessCodeEmail = async (email, code, packageName) => {
  try {
    const packageDisplayNames = {
      'standard': 'Standard Package',
      'elite_self_study': 'Elite Self-Study',
      'elite_live_support': 'Elite Live Support',
      'driving_theory_full': 'Driving + Theory Full Package',
      'complete': 'Complete Package - From Nothing to Full UK License',
      'accelerator_morning': 'Elite 5-Day Theory Accelerator - Morning Power Session',
      'accelerator_evening': 'Elite 5-Day Theory Accelerator - Evening Power Session'
    };

  const displayName = packageDisplayNames[packageName] || packageName;

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'All In One Drive <onboarding@resend.dev>',
    to: [email],
    subject: 'Your All In One Drive Access Code',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .code-box {
              background: white;
              border: 2px dashed #14b8a6;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 8px;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 4px;
              color: #14b8a6;
              font-family: 'Courier New', monospace;
            }
            .button {
              display: inline-block;
              background: #14b8a6;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 14px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Thank You for Your Purchase!</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for purchasing the <strong>${displayName}</strong>!</p>
            <p>Your unique access code is ready. Use it to unlock your content in the All In One Drive app.</p>
            
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your Access Code:</p>
              <div class="code">${code}</div>
            </div>
            
            <h3>How to Use Your Code:</h3>
            <ol>
              <li>Open the All In One Drive app (or visit the app in your browser)</li>
              <li>Navigate to the "Enter Access Code" section</li>
              <li>Enter the code above</li>
              <li>Your purchased content will be unlocked immediately!</li>
            </ol>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
            
            <div class="footer">
              <p>Best regards,<br>The All In One Drive Team</p>
              <p style="margin-top: 10px;">
                <a href="mailto:linawahidi@allinonedrive.com" style="color: #14b8a6;">linawahidi@allinonedrive.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Thank You for Your Purchase!

Hi there,

Thank you for purchasing the ${displayName}!

Your unique access code is: ${code}

How to Use Your Code:
1. Open the All In One Drive app (or visit the app in your browser)
2. Navigate to the "Enter Access Code" section
3. Enter the code above
4. Your purchased content will be unlocked immediately!

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
The All In One Drive Team
linawahidi@allinonedrive.com
    `
  });

  if (error) {
    console.error('Resend API error:', error);
    throw error;
  }

  return data;
};

module.exports = { sendAccessCodeEmail };

