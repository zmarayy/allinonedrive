import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './Logo';

// Utility function to detect mobile devices
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent);
  const isMobileScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // More reliable mobile detection
  return isMobileUA || (isMobileScreen && isTouchDevice);
};

function AppPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showDesktopMessage, setShowDesktopMessage] = useState(false);
  const isMobile = isMobileDevice();

  // Listen for the beforeinstallprompt event (only on mobile/installable browsers)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLaunchApp = async (e) => {
    // Prevent any default navigation
    if (e) {
      e.preventDefault();
    }
    
    // If on desktop/laptop, show message and stop
    if (!isMobile) {
      setShowDesktopMessage(true);
      // Don't auto-hide - let user see it clearly
      return;
    }

    // If on mobile and install prompt is available, trigger it
    if (deferredPrompt) {
      try {
        console.log('📱 Mobile device detected - showing install prompt');
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User ${outcome} the install prompt`);
        
        // Clear the deferredPrompt
        setDeferredPrompt(null);
        
            // Navigate to the PWA access code page after prompt
        if (outcome === 'accepted') {
          // Small delay to let the prompt close, then navigate to PWA access code page
          setTimeout(() => {
            // Navigate to the PWA access code page
            // Get PWA URL from environment variable or use production PWA URL
            const pwaUrl = process.env.REACT_APP_PWA_URL || 'https://allinonedrive.netlify.app/access-code';
            console.log('Navigating to PWA:', pwaUrl);
            window.location.href = pwaUrl;
          }, 500);
        } else {
          // User dismissed, still navigate to PWA
          const pwaUrl = process.env.REACT_APP_PWA_URL || 'https://allinonedrive.netlify.app/access-code';
          console.log('Navigating to PWA:', pwaUrl);
          window.location.href = pwaUrl;
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
        // Fallback: navigate to PWA
        const pwaUrl = process.env.REACT_APP_PWA_URL || 'https://allinonedrive.netlify.app/access-code';
        console.log('Navigating to PWA (fallback):', pwaUrl);
        window.location.href = pwaUrl;
      }
    } else {
      // No install prompt available (maybe already installed or not supported)
      console.log('📱 Mobile device detected but no install prompt available - navigating directly to PWA');
      const pwaUrl = process.env.REACT_APP_PWA_URL || 'https://allinonedrive.netlify.app/access-code';
      console.log('Navigating to PWA:', pwaUrl);
      window.location.href = pwaUrl;
    }
  };

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
            
            {/* Desktop Navigation Links */}
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
              <Link to="/terms" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Terms
              </Link>
              <Link to="/app" className="text-primary-600 font-medium">
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
                <Link to="/terms" className="block px-3 py-2 text-gray-700 font-medium rounded-md hover:bg-white/30 hover:text-primary-600 transition-colors" onClick={toggleMobileMenu}>
                  Terms & Privacy
                </Link>
                <Link to="/app" className="block px-3 py-2 text-primary-600 font-medium rounded-md hover:bg-white/30 transition-colors" onClick={toggleMobileMenu}>
                  App
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Centered Glassmorphic Container */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                Access the All In One Drive App
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6 animate-fade-in-up animation-delay-200">
                Learn anytime, anywhere – on your phone like a real app
              </p>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                Our Progressive Web App (PWA) is fully installable on your device, works offline 
                once downloaded, and automatically saves your progress across all your devices. 
                Experience seamless learning with no app store required!
              </p>
            </div>

            {/* Step-by-Step Installation Guide with Screenshots */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                How to Install the App
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1 max-w-xs">
                  <div className="relative w-full">
                    <div className="aspect-[9/16] rounded-xl border-2 border-primary-300/50 overflow-hidden shadow-lg">
                      <img 
                        src="/images/app-install-guide/guide1.jpg" 
                        alt="Step 1: How to install the app"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-center p-6 bg-gray-100">
                        <div>
                          <div className="text-4xl mb-3">📱</div>
                          <p className="text-gray-600 font-medium text-sm">
                            Step 1 Screenshot
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      1
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center text-primary-600 flex-shrink-0">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="md:hidden flex items-center justify-center text-primary-600 my-2">
                  <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1 max-w-xs">
                  <div className="relative w-full">
                    <div className="aspect-[9/16] rounded-xl border-2 border-primary-300/50 overflow-hidden shadow-lg">
                      <img 
                        src="/images/app-install-guide/guide2.jpg" 
                        alt="Step 2: How to install the app"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-center p-6 bg-gray-100">
                        <div>
                          <div className="text-4xl mb-3">📱</div>
                          <p className="text-gray-600 font-medium text-sm">
                            Step 2 Screenshot
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      2
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center text-primary-600 flex-shrink-0">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="md:hidden flex items-center justify-center text-primary-600 my-2">
                  <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1 max-w-xs">
                  <div className="relative w-full">
                    <div className="aspect-[9/16] rounded-xl border-2 border-primary-300/50 overflow-hidden shadow-lg">
                      <img 
                        src="/images/app-install-guide/guide3.jpg" 
                        alt="Step 3: How to install the app"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-center p-6 bg-gray-100">
                        <div>
                          <div className="text-4xl mb-3">📱</div>
                          <p className="text-gray-600 font-medium text-sm">
                            Step 3 Screenshot
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Installation Instructions - 2 Columns */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Android Instructions */}
              <div className="glass-card p-6 md:p-8 animate-slide-up">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">📱</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    How to install on Android
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">1.</span>
                    <span>Click the <strong>Share</strong> icon</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">2.</span>
                    <span>Click <strong>"Add to Home Screen"</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">3.</span>
                    <span>Click <strong>"Add"</strong></span>
                  </li>
                </ul>
              </div>

              {/* iOS Instructions */}
              <div className="glass-card p-6 md:p-8 animate-slide-up">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">🍎</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    How to install on iOS
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">1.</span>
                    <span>Click the <strong>Share</strong> icon</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">2.</span>
                    <span>Click <strong>"Add to Home Screen"</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">3.</span>
                    <span>Click <strong>"Add"</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Launch Button */}
            <div className="text-center animate-slide-up">
              <button
                type="button"
                onClick={handleLaunchApp}
                className="glass-button bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 md:py-5 md:px-12 text-lg md:text-xl rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-3"
              >
                <span className="text-2xl">🚀</span>
                <span>Launch the App Now</span>
              </button>
              
              {/* Desktop Warning Message */}
              {showDesktopMessage && (
                <div className="mt-6 animate-fade-in">
                  <div className="max-w-2xl mx-auto bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 shadow-lg relative">
                    <button
                      onClick={() => setShowDesktopMessage(false)}
                      className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800 transition-colors"
                      aria-label="Close message"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="flex items-start pr-8">
                      <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-lg font-bold text-yellow-900 mb-2">
                          📱 Mobile App Only
                        </h3>
                        <p className="text-sm font-semibold text-yellow-800 mb-2">
                          This app is designed for mobile devices only. Please use your phone or tablet to install and access the app.
                        </p>
                        <p className="text-xs text-yellow-700 mt-2">
                          Open this page on your mobile device and tap "Launch the App Now" to install it to your home screen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center animate-fade-in animation-delay-600">
              <p className="text-sm text-gray-600">
                <Link to="/packages" className="text-primary-600 hover:text-primary-700 font-semibold underline transition-colors">
                  Get your access code here
                </Link>
              </p>
              {!isMobile && (
                <p className="text-xs text-gray-400 mt-2">
                  💡 Tip: Open this page on your mobile device to install the app
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPage;

