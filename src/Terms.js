import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

function Terms() {
  const [activeTab, setActiveTab] = useState('terms');
  
  const modernSlaveryContent = [
    {
      title: "Introduction",
      content: "All In One Drive is committed to conducting its business with integrity, transparency, and respect for human rights. We fully support the eradication of modern slavery, human trafficking, forced labour, and exploitation in all its forms. This policy outlines our approach to ensuring compliance with the UK Modern Slavery Act 2015 and reflects our commitment to ethical business practices throughout our operations and supply chains."
    },
    {
      title: "Our Commitment",
      content: "We are committed to: Preventing modern slavery and human trafficking in all aspects of our business. Taking a zero-tolerance approach to exploitation, forced labour, and human trafficking. Implementing and enforcing effective systems and controls to mitigate risks of modern slavery."
    },
    {
      title: "Scope",
      content: "This policy applies to: All employees, contractors, suppliers, and third-party partners working with or on behalf of All In One Drive. Our entire supply chain, ensuring ethical practices at every level."
    },
    {
      title: "Governance and Accountability",
      content: "Responsibility for implementing this policy lies with senior management. All employees and partners are responsible for understanding and adhering to this policy."
    },
    {
      title: "Risk Assessment",
      content: "We conduct regular risk assessments to identify and mitigate potential areas of concern in our operations and supply chain. Due diligence processes are carried out for all new suppliers and partners."
    },
    {
      title: "Supplier and Partner Standards",
      content: "All suppliers and partners are expected to comply with this policy. Contracts with suppliers include clauses requiring adherence to anti-slavery and anti-trafficking laws."
    },
    {
      title: "Training and Awareness",
      content: "Employees are trained to recognise signs of modern slavery and understand their responsibilities in preventing it. Regular updates and training sessions are provided to ensure continued compliance."
    },
    {
      title: "Reporting and Whistleblowing",
      content: "Employees, suppliers, and partners are encouraged to report any suspicions or evidence of modern slavery via our confidential reporting mechanism. All reports are taken seriously and investigated thoroughly."
    },
    {
      title: "Continuous Improvement",
      content: "We review and update our policies and procedures annually to reflect changes in legislation and best practices. Collaboration with industry bodies and stakeholders ensures we remain proactive in tackling modern slavery."
    },
    {
      title: "Compliance and Monitoring",
      content: "We monitor compliance with this policy through: Regular audits and assessments of our operations and supply chain. Reviewing supplier contracts and performance to ensure alignment with our values."
    },
    {
      title: "Breaches of Policy",
      content: "Any breach of this policy: By employees will result in disciplinary action, up to and including dismissal. By suppliers or partners may result in termination of contracts or partnerships."
    },
    {
      title: "Conclusion",
      content: "All In One Drive is dedicated to creating a business environment free from exploitation and modern slavery. By embedding this policy into our operations, we aim to uphold the highest ethical standards and contribute to a fair and just global economy."
    }
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const termsContent = [
    {
      title: "Introduction",
      content: "By accessing AllInOneDrive.com, you agree to be bound by these Terms of Use."
    },
    {
      title: "Course Access",
      content: "Each course is valid for one user only and cannot be shared."
    },
    {
      title: "Booking & Cancellations",
      content: "Bookings are non-refundable. You can change your slot by contacting support at least 72 hours in advance."
    },
    {
      title: "Intellectual Property",
      content: "All videos, PDFs, and materials are owned by All In One Drive and may not be copied, shared, or reproduced."
    },
    {
      title: "Limitation of Liability",
      content: "We are not responsible for exam failure, technical issues, or delays due to third-party services."
    },
    {
      title: "Changes to Terms",
      content: "We may update these terms anytime. Continued use of the platform constitutes acceptance."
    }
  ];

  const privacyContent = [
    {
      title: "Introduction",
      description: [
        "Welcome to All In One Drive (“we”, “us”, or “our”). Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://allinonedrive.com/ (the “Site”). Please read this policy carefully to understand our views and practices regarding your personal data."
      ]
    },
    {
      title: "Information We Collect",
      description: [
        "We collect several types of information from and about users of our Site, including:"
      ],
      bullets: [
        {
          label: "Personal Data",
          items: [
            "Information that you voluntarily provide when you contact us, subscribe to our newsletter, request support, or purchase services.",
            "This may include your name, email address, phone number, preferred language, booking preferences, and any other details you choose to share."
          ]
        },
        {
          label: "Non-Personal Data",
          items: [
            "Automatically collected information as you navigate through the Site such as IP address, browser type, device type, operating system, pages viewed, and the duration of visits."
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      description: [
        "We use the information we collect for the following purposes:"
      ],
      bullets: [
        {
          items: [
            "To provide, maintain, and improve our Site, digital products, and support services.",
            "To communicate with you about enquiries, bookings, or service-related updates.",
            "To send newsletters, study resources, or promotional content when you have opted in.",
            "To ensure the security of our platform and prevent fraud or misuse.",
            "To analyse Site usage and improve its performance and functionality."
          ]
        }
      ]
    },
    {
      title: "Sharing Your Information",
      description: [
        "We do not sell or rent your personal data to third parties. However, we may share your information with:"
      ],
      bullets: [
        {
          items: [
            "Service providers who assist in operating our Site or delivering services (e.g., hosting providers, email platforms, payment processors such as Stripe).",
            "Regulators, law enforcement, or other authorities when required to comply with applicable laws, regulations, legal processes, or governmental requests.",
            "Potential buyers or partners in the event of a merger, sale, or transfer of assets—your data may be included as part of the transaction."
          ]
        }
      ]
    },
    {
      title: "Cookies and Tracking Technologies",
      description: [
        "Our Site uses cookies and similar technologies to enhance your browsing experience. These may include:"
      ],
      bullets: [
        {
          label: "Essential Cookies",
          items: ["Necessary for the Site’s core functionality and security."]
        },
        {
          label: "Analytics Cookies",
          items: ["Used to track performance and usage statistics (e.g., Google Analytics)."]
        },
        {
          label: "Advertising Cookies",
          items: ["Used to deliver relevant content or promotional messages."]
        }
      ],
      footer: "You can control or disable cookies through your browser settings. Please note that doing so may affect certain features of the Site."
    },
    {
      title: "Data Security",
      description: [
        "We implement appropriate technical and organisational measures to protect your personal data from loss, misuse, unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      title: "Your Rights",
      description: [
        "Depending on your location, you may have certain rights under applicable data protection laws, including the right to:"
      ],
      bullets: [
        {
          items: [
            "Access the personal data we hold about you.",
            "Request correction of inaccurate or incomplete data.",
            "Request deletion of your personal data, subject to legal obligations.",
            "Object to or restrict processing for certain purposes.",
            "Request a copy of your personal data in a structured, electronic format."
          ]
        }
      ],
      footer: "To exercise these rights, please contact us at privacy@allinonedrive.com."
    },
    {
      title: "Third-Party Links",
      description: [
        "Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites. We encourage you to review their privacy policies before providing any personal data."
      ]
    },
    {
      title: "Children’s Privacy",
      description: [
        "Our services are not intended for children under 16 years of age. We do not knowingly collect personal data from children. If you believe we have collected information from a child under 16, please contact us and we will remove it promptly."
      ]
    },
    {
      title: "Changes to This Privacy Policy",
      description: [
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information."
      ]
    },
    {
      title: "Contact Us",
      description: [
        "If you have any questions about this Privacy Policy or our data practices, please contact us:"
      ],
      bullets: [
        {
          items: [
            "All In One Drive",
            "Email: privacy@allinonedrive.com",
            "Phone: +44 7908 853486",
            "Address: Suite 6670, Unit 3A, 34-35 Hatton Garden, Holborn, London EC1N 8DX, UK",
            "Effective Date: 01.01.2025"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200/90 to-slate-200 relative">
      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Logo className="w-10 h-10" />
              <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                All In One Drive
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                About Us
              </Link>
              <Link to="/packages" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Packages
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Contact
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                FAQ
              </Link>
              <Link to="/teach" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Teach With Us
              </Link>
              <Link to="/terms" className="text-primary-600 font-medium">
                Terms
              </Link>
              <Link to="/app" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                App
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary-600 transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/20 backdrop-blur-md border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <Link to="/about" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  About Us
                </Link>
                <Link to="/packages" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Packages
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Contact
                </Link>
                <Link to="/faq" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  FAQ
                </Link>
                <Link to="/teach" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Teach With Us
                </Link>
                <Link to="/terms" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
                  Terms & Privacy
                </Link>
                <Link to="/app" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  App
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your Trust, Our Responsibility
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 font-medium leading-relaxed max-w-4xl mx-auto">
              Please review our Terms & Conditions, Privacy Policy, and Modern Slavery Policy below.
            </p>
            
            {/* Floating Lock Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-6 shadow-xl border border-white/20 animate-pulse">
                <span className="text-6xl">🔒</span>
              </div>
            </div>
            
            {/* Animated Gradient Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-blue-600 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          {/* Background Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20"></div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-lg">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeTab === 'terms'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeTab === 'privacy'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('modern-slavery')}
                  className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeTab === 'modern-slavery'
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  Modern Slavery Policy
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            {activeTab === 'terms' ? (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Terms & Conditions
                </h2>
                {termsContent.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary-600 pl-6 py-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : activeTab === 'privacy' ? (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Privacy Policy
                </h2>
                {privacyContent.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6 py-4 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    {item.description && item.description.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 font-medium leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {item.bullets && item.bullets.map((group, bulletIdx) => (
                      <div key={bulletIdx} className="space-y-2">
                        {group.label && (
                          <p className="text-gray-700 font-semibold">
                            {group.label}:
                          </p>
                        )}
                        <ul className="list-disc list-inside space-y-1 text-gray-600 font-medium">
                          {group.items.map((bullet, itemIdx) => (
                            <li key={itemIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {item.footer && (
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {item.footer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header with dates */}
                <div className="text-center mb-8 pb-6 border-b-2 border-emerald-500/30">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Modern Slavery Policy
                  </h2>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-600 font-medium">
                    <p><strong className="text-gray-900">Effective Date:</strong> 01.01.2025</p>
                    <p><strong className="text-gray-900">Review Date:</strong> 01.01.2026</p>
                  </div>
                </div>
                
                {modernSlaveryContent.map((item, index) => (
                  <div key={index} className="border-l-4 border-emerald-600 pl-6 py-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
                
                {/* Contact Information */}
                <div className="mt-10 pt-8 border-t-2 border-emerald-500/30">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-4">
                    If you have any concerns or queries regarding this policy, please contact:
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <p className="text-gray-900 font-bold mb-2">All In One Drive</p>
                    <p className="text-gray-700 font-medium mb-1">
                      <strong>Email:</strong> <a href="mailto:wahidi.lina@allinonedrive.com" className="text-primary-600 hover:text-primary-700 underline">wahidi.lina@allinonedrive.com</a>
                    </p>
                    <p className="text-gray-700 font-medium mb-1">
                      <strong>Phone:</strong> +44 7908 853486
                    </p>
                    <p className="text-gray-700 font-medium">
                      <strong>Address:</strong> Suite 6670, Unit 3A, 34-35 Hatton Garden, Holborn, London EC1N 8DX, UK
                    </p>
                  </div>
                </div>
                
                {/* Approval */}
                <div className="mt-8 pt-6 border-t border-gray-300">
                  <p className="text-gray-600 font-medium mb-2">
                    <strong className="text-gray-900">This policy has been approved by:</strong>
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <p className="text-gray-900 font-bold">Lina Wahidi</p>
                    <p className="text-gray-700 font-medium">CEO</p>
                    <p className="text-gray-600 text-sm mt-2">01.01.2025</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Note Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-center text-white shadow-xl">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl font-bold mb-4">
              Questions About Our Policies?
            </h2>
            <p className="text-white/90 font-medium mb-6">
              For questions, contact us at
            </p>
            <a 
              href="mailto:support@allinonedrive.com"
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              support@allinonedrive.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Left Column - Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Logo className="w-6 h-6 sm:w-8 sm:h-8" />
                <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors">
                  All In One Drive
                </Link>
              </div>
              <p className="text-white/80 font-medium italic text-sm sm:text-base">
                "Empowering independence. One lesson at a time."
              </p>
            </div>
            
            {/* Middle Column - Quick Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Home
                </Link>
                <Link to="/about" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  About Us
                </Link>
                <Link to="/packages" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Packages
                </Link>
                <Link to="/contact" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Contact
                </Link>
                <Link to="/faq" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  FAQ
                </Link>
                <Link to="/teach" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Teach With Us
                </Link>
                <Link to="/terms" className="block text-primary-400 font-medium">
                  Terms & Privacy
                </Link>
              </div>
            </div>
            
            {/* Right Column - Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-white/80 font-medium">wahidi.lina@allinonedrive.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="text-white/80 font-medium">+44 7908 853486</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div className="text-white/80 font-medium text-sm leading-relaxed">
                    Suite 6670, Unit 3A<br />
                    34-35 Hatton Garden<br />
                    Holborn, London EC1N 8DX
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-white/80 font-medium">WhatsApp: 9AM–3PM (Sat & Sun)</span>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on Twitter">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on Facebook">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-primary-400 transition-colors duration-300 p-1" aria-label="Follow us on YouTube">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/60 text-sm">
              © 2025 All In One Drive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Terms;
