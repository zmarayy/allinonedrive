const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send access code email to user
 */
const sendAccessCodeEmail = async (email, code, packageName) => {
  try {
    const packageDisplayNames = {
      'standard': 'Standard Package',
      'elite_self_study': 'Elite Self-Study Package',
      'elite_live_support': 'Pro Package',
      'ultimate_pro': 'Ultimate Pro Package',
      'driving_theory_full': 'Driving + Theory Full Package',
      'complete': 'Complete Package - From Nothing to Full UK License',
      'accelerator_morning': 'Elite 5-Day Theory Accelerator - Morning Power Session',
      'accelerator_evening': 'Elite 5-Day Theory Accelerator - Evening Power Session'
    };

    const packageDescriptions = {
      'standard': {
        title: 'Welcome to Your Standard Theory Package! 🎉',
        intro: 'You now have access to our comprehensive Standard Theory Package, perfect for mastering the DVSA theory test at your own pace. This package gives you everything you need to pass your theory test with confidence.',
        features: [
          'All 307 Highway Code Rules (PDF) - Complete reference guide',
          'Interactive Flashcards - Test your knowledge on the go',
          'DVSA Questions & Answers - Practice with real exam questions',
          '5-Minute Short Video Lessons - Quick, digestible learning',
          '7-Day Structured Learning Path - Organized daily study plan'
        ],
        nextSteps: 'Start with Day 1 in the app and work through each day systematically. Complete the study materials, flashcards, and exams to unlock the next day. Take your time and master each topic before moving forward.'
      },
      'elite_self_study': {
        title: 'Welcome to Your Elite Self-Study Package! 🎉',
        intro: 'Congratulations on choosing our Elite Self-Study Package! You now have access to premium video content and comprehensive study materials that will make learning the theory test easier and more engaging.',
        features: [
          'Everything in Standard Package - All PDFs, flashcards, and questions',
          '307 Rules recorded and explained (Video) - Watch and learn at your pace',
          'Exam Topics explained (Video) - Visual explanations of key concepts',
          'Essential Driving Skills (EDS) topics explained (Video) - Master hazard perception',
          'Multi-language support - Access materials in English, Pashto, Dari, and Urdu',
          'Enhanced learning experience with visual explanations'
        ],
        nextSteps: 'Begin with Day 1 and watch the video lessons first - they make everything clearer! Then study the PDF materials, complete flashcards, and take the exams. The video explanations will help you understand concepts much faster.'
      },
      'elite_live_support': {
        title: 'Welcome to Your Elite Live Support Package! 🎉',
        intro: 'Excellent choice! Your Elite Live Support Package includes everything you need plus live teaching sessions to guide you through the most important days. Get personalized help from expert instructors.',
        features: [
          'Everything in Elite Self-Study Package - All videos, PDFs, and materials',
          '2 days of online teaching via Google Meet - Interactive live sessions',
          'Day 1: 4 hours of live instruction - Get started with expert guidance',
          'Day 7: 4 hours of live instruction - Final preparation before your test',
          'Direct access to expert teachers - Ask questions and get immediate answers',
          'Multi-language support - Learn in your preferred language'
        ],
        nextSteps: 'You\'ll receive separate emails with details about your live teaching sessions, including Google Meet links and schedules. In the meantime, start with Day 1 in the app and complete the self-study materials. This will prepare you for the live sessions!'
      },
      'ultimate_pro': {
        title: 'Welcome to Your Ultimate Pro Package! 🎉',
        intro: 'Congratulations! You\'ve chosen our Ultimate Pro Package - the most comprehensive theory package we offer. You now have access to everything including additional live sessions and direct WhatsApp support.',
        features: [
          'Everything in Pro Package - All videos, PDFs, and live sessions',
          '3 days of online teaching via Google Meet - Day 1, Day 2, and Day 7',
          'Day 1: 4 hours of live instruction - Get started with expert guidance',
          'Day 2: 4 hours of live instruction - Deep dive into key topics',
          'Day 7: 4 hours of live instruction - Final preparation before your test',
          '1 week of WhatsApp support - Direct contact with our team anytime',
          'Direct access to expert teachers - Ask questions and get immediate answers',
          'Multi-language support - Learn in your preferred language'
        ],
        nextSteps: 'You\'ll receive separate emails with details about all your live teaching sessions, including Google Meet links and schedules. Start with Day 1 in the app and complete the self-study materials. Use WhatsApp support anytime you need help!'
      },
      'driving_theory_full': {
        title: 'Welcome to Your Driving + Theory Full Package! 🎉',
        intro: 'Fantastic! You\'ve chosen our comprehensive Driving + Theory Full Package. This includes everything you need for both theory and practical driving - we\'ll guide you from start to finish.',
        features: [
          'Full access to Ultimate Pro Theory Package - All theory materials and live sessions',
          'Theory test booking included - We handle the booking for you',
          'Application for provisional license - We complete the paperwork',
          'Practical driving lessons - Professional instruction with qualified instructors',
          'Practical driving test booking - We book your test at the right time',
          'Full support from start to finish - Our team is with you every step',
          'Multi-language support - Learn in your preferred language'
        ],
        nextSteps: 'Start with the theory materials in the app today. Our team will contact you within 24 hours to arrange your theory test booking and discuss your practical driving lesson schedule. We\'ll handle all the bookings and paperwork - you just focus on learning!'
      },
      'complete': {
        title: 'Welcome to Your Complete Package - From Nothing to Full UK License! 🎉',
        intro: 'Congratulations! You\'ve chosen our complete end-to-end service. We\'ll guide you every step of the way from signing up to getting your full UK driving license. This is the ultimate package for complete beginners.',
        features: [
          'Full access to Ultimate Pro Theory Package - All theory materials, videos, and live sessions',
          'Theory test booking - We book it at the perfect time for you',
          'Application for provisional license - We complete all paperwork',
          '45 hours of in-person driving lessons - Comprehensive practical training',
          'Practical driving test booking - We book when you\'re ready',
          'Full support from start to finish - Our team guides you through everything',
          'Multi-language support - Learn in English, Pashto, Dari, or Urdu',
          'WhatsApp support - Direct contact with our team anytime'
        ],
        nextSteps: 'Start with Day 1 in the app to begin your theory studies. Our team will contact you within 24 hours to arrange your theory test booking and discuss your driving lesson schedule. We\'ll handle everything - bookings, paperwork, scheduling - you just focus on learning and passing your tests!'
      },
      'accelerator_morning': {
        title: 'Welcome to Your Elite 5-Day Theory Accelerator - Morning Power Session! 🎉',
        intro: 'Great choice! You\'re enrolled in our intensive Morning Power Session. This accelerated program will help you master the theory test in just 5 days with live online classes. Start your day productive and finish before lunch!',
        features: [
          '5 days live online course (Mon-Fri, 10:00am - 2:00pm) - Intensive, structured lessons',
          '7 days WhatsApp support - Ask questions anytime during the week',
          'Very small group (max 5 people) - More attention, more questions, more confidence',
          'Theory explained in your own language (where possible) - No stress about difficult English words',
          'Application for provisional licence (if needed) - We do it for you, no hassle',
          'One theory exam booking included - We book the test for you',
          'Free course repeat if you fail - One extra full course, no extra charge',
          'Access to learning app included - Practice questions and mock exams anytime',
          'Multi-language materials - PDFs and videos in English, Pashto, Dari, and Urdu'
        ],
        nextSteps: 'You\'ll receive a separate email within 24 hours with your class schedule, Google Meet link, and all course details. Classes start on Monday at 10:00am. In the meantime, download the app and explore the materials to get a head start. See you in class!'
      },
      'accelerator_evening': {
        title: 'Welcome to Your Elite 5-Day Theory Accelerator - Evening Power Session! 🎉',
        intro: 'Perfect for busy schedules! You\'re enrolled in our Evening Power Session. Study after work in a calm environment with our intensive 5-day program. Learn at your most relaxed time of day.',
        features: [
          '5 days live online course (Mon-Fri, 7:30pm - 10:30pm) - Intensive, structured lessons',
          '7 days WhatsApp support - Ask questions anytime during the week',
          'Very small group (max 5 people) - More attention, more questions, more confidence',
          'Theory explained in your own language (where possible) - No stress about difficult English words',
          'Application for provisional licence (if needed) - We do it for you, no hassle',
          'One theory exam booking included - We book the test for you',
          'Free course repeat if you fail - One extra full course, no extra charge',
          'Access to learning app included - Practice questions and mock exams anytime',
          'Multi-language materials - PDFs and videos in English, Pashto, Dari, and Urdu'
        ],
        nextSteps: 'You\'ll receive a separate email within 24 hours with your class schedule, Google Meet link, and all course details. Classes start on Monday at 7:30pm. In the meantime, download the app and explore the materials to get a head start. See you in class!'
      }
    };

    const displayName = packageDisplayNames[packageName] || packageName;
    const packageInfo = packageDescriptions[packageName] || {
      title: `Welcome to Your ${displayName}!`,
      intro: `Thank you for purchasing the ${displayName}!`,
      features: [],
      nextSteps: 'Start using your access code in the app to unlock your content.'
    };

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'All In One Drive <linawahidi@allinonedrive.com>',
    to: [email],
    subject: `🎉 Your ${displayName} Access Code - All In One Drive`,
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
            <h1>🎉 ${packageInfo.title}</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>${packageInfo.intro}</p>
            
            ${packageInfo.features.length > 0 ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
              <h3 style="margin-top: 0; color: #0d9488;">What's Included:</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                ${packageInfo.features.map(feature => `<li style="margin: 8px 0; color: #374151;">${feature}</li>`).join('')}
              </ul>
            </div>
            ` : ''}
            
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your Access Code:</p>
              <div class="code">${code}</div>
            </div>
            
            <h3 style="color: #0d9488;">How to Get Started:</h3>
            <ol style="line-height: 1.8;">
              <li>Open the All In One Drive app (or visit <a href="https://allinonedrive.netlify.app" style="color: #14b8a6;">allinonedrive.netlify.app</a> in your browser)</li>
              <li>Navigate to the "Enter Access Code" section</li>
              <li>Enter the code above</li>
              <li>Your purchased content will be unlocked immediately!</li>
            </ol>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-weight: 500;">💡 <strong>Next Steps:</strong></p>
              <p style="margin: 8px 0 0 0; color: #047857;">${packageInfo.nextSteps}</p>
            </div>
            
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
${packageInfo.title}

Hi there,

${packageInfo.intro}

${packageInfo.features.length > 0 ? `
What's Included:
${packageInfo.features.map(feature => `- ${feature}`).join('\n')}
` : ''}

Your unique access code is: ${code}

How to Get Started:
1. Open the All In One Drive app (or visit allinonedrive.netlify.app in your browser)
2. Navigate to the "Enter Access Code" section
3. Enter the code above
4. Your purchased content will be unlocked immediately!

Next Steps:
${packageInfo.nextSteps}

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
  } catch (error) {
    console.error('Error sending access code email:', error);
    throw error;
  }
};

module.exports = { sendAccessCodeEmail };

