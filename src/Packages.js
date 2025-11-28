import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

// Backend API URL - update this for production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Packages() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(null); // Track which button is loading
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForCheckout, setEmailForCheckout] = useState('');
  const [packageForCheckout, setPackageForCheckout] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    transmission: '',
    language: '',
    hours: '',
    email: ''
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePackageSelect = (packageType) => {
    setSelectedPackage(selectedPackage === packageType ? null : packageType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validate hours input - cannot exceed 40
    if (name === 'hours') {
      const numValue = parseInt(value, 10);
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      } else if (!isNaN(numValue)) {
        // Cap at 40 if user tries to enter more
        const cappedValue = numValue > 40 ? 40 : numValue;
        setFormData(prev => ({
          ...prev,
          [name]: cappedValue.toString()
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading('practical');
      
      // Send booking request (you can connect this to your backend/email service)
      console.log('Form submitted:', { packageType: selectedPackage, ...formData });
      
      // TODO: Connect to your backend API or email service
      // For now, just show success message
      alert('Booking request submitted! We will contact you soon to complete your purchase.');
      
      // Reset form
      setFormData({
        location: '',
        transmission: '',
        language: '',
        hours: '',
        email: ''
      });
      setSelectedPackage(null);
      setLoading(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit booking request. Please try again or contact support.');
      setLoading(null);
    }
  };

  /**
   * Open email modal for checkout
   */
  const openEmailModal = (packageType) => {
    setPackageForCheckout(packageType);
    setEmailForCheckout('');
    setShowEmailModal(true);
  };

  /**
   * Handle email modal submit and create Stripe checkout
   */
  const handleEmailSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!emailForCheckout || !emailForCheckout.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setLoading(packageForCheckout);
      setShowEmailModal(false);

      // Prepare request body
      const requestBody = {
        package: packageForCheckout,
        email: emailForCheckout
      };

      // Add custom amount for complete package
      if (packageForCheckout === 'complete') {
        requestBody.amount = 329999; // £3,299.99 in pence
      }

      // Create checkout session
      const response = await fetch(`${API_BASE_URL}/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      }

    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again or contact support.');
      setLoading(null);
    }
  };

  const handleCompletePackageSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // Open email modal for complete package
    openEmailModal('complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200/90 to-slate-200 relative">
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-8 max-w-md w-full mx-4 animate-slide-up border-2 border-white/30 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Your Email
              </h3>
              <p className="text-gray-600 font-medium">
                We'll send your access code to this email after purchase
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <label htmlFor="checkout-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="checkout-email"
                  value={emailForCheckout}
                  onChange={(e) => setEmailForCheckout(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white text-gray-900"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailForCheckout('');
                    setPackageForCheckout(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Continue to Checkout
                </button>
              </div>
            </form>

            {packageForCheckout === 'complete' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium text-center">
                  Complete Package (£3,299.99) - Full service from start to finish
                </p>
              </div>
            )}
          </div>
        </div>
      )}
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
              <Link to="/packages" className="text-primary-600 font-medium">
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
                <Link to="/packages" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Choose Your Package
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Select the perfect learning package for your driving journey
          </p>
        </div>
      </section>

      {/* Theory Packages Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Theory Packages
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Master the DVSA theory test with our comprehensive theory packages
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Standard Theory Package */}
            <div className="glass-card p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-green-200 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Standard Theory Package</h3>
                <div className="mb-4">
                  <div className="text-lg sm:text-2xl font-bold text-primary-600">£24.99</div>
                  <span className="text-xs sm:text-sm text-green-600 font-semibold">45% OFF</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>All 307 Highway Code Rules (PDF)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Flashcards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>DVSA Questions & Answers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>5-Minute Short Video Lessons</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => openEmailModal('standard')}
                disabled={loading === 'standard'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'standard' ? 'Loading...' : 'Buy Now'}
              </button>
            </div>

            {/* Elite Self-Study Package */}
            <div className="glass-card p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-yellow-200 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Elite Self-Study Package</h3>
                <div className="mb-4">
                  <div className="text-lg sm:text-2xl font-bold text-primary-600">£39.99</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Everything in Standard Package</p>
                <p className="text-xs sm:text-sm font-bold text-yellow-700 mb-2">PLUS:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span><strong className="text-yellow-700">307 Rules recorded and explained</strong> (Video)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span><strong className="text-yellow-700">Exam Topics explained</strong> (Video)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span><strong className="text-yellow-700">EDS topics explained</strong> (Video)</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => openEmailModal('elite')}
                disabled={loading === 'elite'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'elite' ? 'Loading...' : 'Buy Now'}
              </button>
            </div>

            {/* Pro Package */}
            <div className="glass-card p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-orange-200 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Pro Package</h3>
                <div className="mb-4">
                  <div className="text-lg sm:text-2xl font-bold text-primary-600">£139.99</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Everything in Elite Package</p>
                <p className="text-xs sm:text-sm font-bold text-orange-700 mb-2">PLUS:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong className="text-orange-700">2 days of online teaching</strong> (via Google Meet)</span>
                  </li>
                  <li className="flex items-start pl-5">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Day 1: 4 hours</span>
                  </li>
                  <li className="flex items-start pl-5">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Day 7: 4 hours</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => openEmailModal('pro')}
                disabled={loading === 'pro'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'pro' ? 'Loading...' : 'Buy Now'}
              </button>
            </div>

            {/* Ultimate Pro */}
            <div className="glass-card p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-red-200 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">Ultimate Pro</h3>
                <div className="mb-4">
                  <div className="text-lg sm:text-2xl font-bold text-primary-600">£199.99</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6 text-left flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Everything in Pro Package</p>
                <p className="text-xs sm:text-sm font-bold text-red-700 mb-2">PLUS:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-700">1 additional online teaching day</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-700">1 week of WhatsApp support</strong> (direct contact)</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => openEmailModal('ultimate_pro')}
                disabled={loading === 'ultimate_pro'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'ultimate_pro' ? 'Loading...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Driving Packages Section */}
      <section className="py-12 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Practical Driving Packages
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Get behind the wheel with our practical driving lesson packages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Practical Package WITH Test Booking */}
            <div className={`glass-card p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-green-200 ${selectedPackage === 'with-test' ? 'bg-white/30' : ''}`}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🟢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Package WITH Test Booking</h3>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Custom driving hours (1 to 40)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong className="text-green-700">Practical driving test booking included</strong></span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => handlePackageSelect('with-test')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {selectedPackage === 'with-test' ? 'Cancel' : 'Buy'}
              </button>
            </div>

            {/* Practical Package WITHOUT Test Booking */}
            <div className={`glass-card p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border-2 border-yellow-200 ${selectedPackage === 'without-test' ? 'bg-white/30' : ''}`}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🟡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Package WITHOUT Test Booking</h3>
              </div>
              
              <div className="space-y-2 mb-6 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Custom driving hours (1 to 40)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>No driving test booking included</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => handlePackageSelect('without-test')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {selectedPackage === 'without-test' ? 'Cancel' : 'Buy'}
              </button>
            </div>
          </div>

          {/* Booking Form */}
          {selectedPackage && (
            <div className="max-w-2xl mx-auto mt-8">
              <div className="glass-card p-8 animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Complete Your Purchase
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Transmission */}
                  <div>
                    <label htmlFor="transmission" className="block text-sm font-semibold text-gray-700 mb-2">
                      Transmission <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select transmission type</option>
                      <option value="manual">Manual</option>
                      <option value="automatic">Automatic</option>
                    </select>
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Language <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select preferred language</option>
                      <option value="english">English</option>
                      <option value="pashto">Pashto</option>
                      <option value="dari">Dari</option>
                      <option value="urdu">Urdu</option>
                    </select>
                  </div>

                  {/* Hours */}
                  <div>
                    <label htmlFor="hours" className="block text-sm font-semibold text-gray-700 mb-2">
                      Hours <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="hours"
                      name="hours"
                      value={formData.hours}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        // Prevent typing numbers greater than 40
                        if (e.key >= '0' && e.key <= '9') {
                          const currentValue = formData.hours || '';
                          const newValue = currentValue + e.key;
                          if (parseInt(newValue, 10) > 40) {
                            e.preventDefault();
                          }
                        }
                      }}
                      required
                      min="1"
                      max="40"
                      placeholder="Enter number of hours (1-40)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum: 1 hour, Maximum: 40 hours</p>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading === 'practical'}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading === 'practical' ? 'Processing...' : 'Request Booking'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Complete Package Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-10 md:p-12 border-2 border-primary-300/50 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <span className="text-4xl">🚗</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                From Nothing to Full UK License – Complete Package
              </h2>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
                £3,299.99
              </div>
            </div>

            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-6">
                This complete end-to-end service includes:
              </p>
            </div>

            {/* Features List */}
            <div className="mb-10">
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium">Full access to the <strong className="text-primary-600">Ultimate Pro Theory Package</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium">Theory test booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium">Application for provisional license</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium"><strong className="text-primary-600">45 hours</strong> of in-person driving lessons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium">Practical driving test booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-2xl mr-4 mt-1">✅</span>
                  <span className="text-lg text-gray-700 font-medium">Full support from start to finish</span>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center mb-8">
              <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-6">
                We'll handle everything — from signing up to getting your license.
              </p>
              <button
                onClick={handleCompletePackageSubmit}
                disabled={loading === 'complete'}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'complete' ? 'Processing...' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12 px-4 sm:px-6 mt-20">
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
                <Link to="/packages" className="block text-primary-400 font-medium">
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

export default Packages;

