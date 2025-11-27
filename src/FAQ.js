import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const faqs = [
    {
      id: 1,
      question: "What packages do you offer?",
      answer: "We offer four theory packages: Standard (£24.99), Elite Self-Study (£39.99), Pro (£139.99), and Ultimate Pro (£199.99). Each package includes different features - from PDF materials to video lessons, live classes, and WhatsApp support. Check our Packages page for full details.",
      icon: "📦"
    },
    {
      id: 2,
      question: "What's included in each package?",
      answer: "All packages include PDF materials (Highway Code, EDS topics, exam materials). Elite+ includes video lessons. Pro+ includes live online classes (Day 1 & Day 7). Ultimate Pro includes everything plus Day 2 live class and WhatsApp support. See our Packages page for complete details.",
      icon: "📚"
    },
    {
      id: 3,
      question: "How do I access my purchased package?",
      answer: "After purchasing, you'll receive a unique 8-character access code via email. Enter this code in our PWA app to unlock your package content. The code is linked to your specific package and gives you lifetime access to the materials.",
      icon: "🔑"
    },
    {
      id: 4,
      question: "What languages are the materials available in?",
      answer: "All our materials are available in Pashto, Urdu, Dari, and English. You can select your preferred language when accessing the content in our app.",
      icon: "🌍"
    },
    {
      id: 5,
      question: "Is this course DVSA-approved?",
      answer: "Yes! Our course follows official DVSA theory standards and is based on the official DVSA guide. All materials are designed to help you pass the official UK driving theory test.",
      icon: "✅"
    },
    {
      id: 6,
      question: "What is the PWA app and how do I use it?",
      answer: "Our Progressive Web App (PWA) works like a mobile app but runs in your browser. You can install it on your phone for offline access. After purchasing a package, enter your access code in the app to unlock your content. Visit our App page for installation instructions.",
      icon: "📱"
    },
    {
      id: 7,
      question: "When are live classes available?",
      answer: "Live online classes are available for Pro and Ultimate Pro packages. Classes are conducted via Google Meet, typically scheduled for 4-hour sessions. Day 1 and Day 7 classes are available for Pro+, while Ultimate Pro also includes Day 2. You'll receive booking information after purchase.",
      icon: "💻"
    },
    {
      id: 8,
      question: "What is WhatsApp support?",
      answer: "WhatsApp support is exclusive to Ultimate Pro package holders. You'll be added to a private WhatsApp group where you can get direct help from instructors, ask questions, and receive study tips. Support is available on weekends (Saturday & Sunday, 9 AM - 3 PM).",
      icon: "💬"
    },
    {
      id: 9,
      question: "Can I upgrade my package later?",
      answer: "Yes! If you purchase a lower-tier package and want to upgrade, contact us and we can help you upgrade to a higher package. You'll only pay the difference between packages.",
      icon: "⬆️"
    },
    {
      id: 10,
      question: "Do you offer practical driving lessons?",
      answer: "Yes! We offer practical driving packages with custom hours (1-40 hours). You can choose packages with or without test booking included. Visit our Packages page to see practical driving options and the complete package (theory + practical).",
      icon: "🚗"
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
              <Link to="/faq" className="text-primary-600 font-medium">
                FAQ
              </Link>
              <Link to="/teach" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Teach With Us
              </Link>
              <Link to="/terms" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
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
                <Link to="/faq" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
                  FAQ
                </Link>
                <Link to="/teach" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Teach With Us
                </Link>
                <Link to="/terms" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
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
              Have Questions? We've Got Answers.
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 font-medium leading-relaxed max-w-4xl mx-auto">
              Everything you need to know about our packages, app, and services.
            </p>
            
            {/* Floating Question Mark Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-6 shadow-xl border border-white/20 animate-pulse">
                <span className="text-6xl">❓</span>
              </div>
            </div>
          </div>
          
          {/* Background Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20"></div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Find answers about our packages, access codes, and learning platform
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{faq.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <svg 
                    className={`w-6 h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${openFAQ === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="ml-12">
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Download Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-12 text-center text-white shadow-xl">
            <div className="text-6xl mb-6">📥</div>
            
            <h2 className="text-4xl font-bold mb-6">
              Driving Resources Hub
            </h2>
            
            <p className="text-xl text-white/90 mb-8 font-medium leading-relaxed">
              We'll soon offer downloadable Highway Code summaries, mock tests, and driving tips here. Stay tuned!
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Coming Soon:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-2xl">📋</div>
                  <p className="font-medium">Highway Code Summaries</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">📝</div>
                  <p className="font-medium">Mock Test Papers</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">💡</div>
                  <p className="font-medium">Driving Tips & Tricks</p>
                </div>
              </div>
            </div>
            
            <button 
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => alert('Coming soon! We\'ll notify you when resources are available.')}
            >
              Notify Me
            </button>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Support
              </Link>
              <Link 
                to="/packages" 
                className="backdrop-blur-md bg-white/20 hover:bg-white/30 text-gray-700 font-semibold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 transform hover:scale-105"
              >
                View Packages
              </Link>
            </div>
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
                "confidence first. Licence ready"
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
                <Link to="/faq" className="block text-primary-400 font-medium">
                  FAQ
                </Link>
                <Link to="/teach" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
                  Teach With Us
                </Link>
                <Link to="/terms" className="block text-white/80 hover:text-primary-400 transition-colors duration-300">
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
                  <span className="text-white/80 font-medium">linawahidi@allinonedrive.com</span>
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

export default FAQ;
