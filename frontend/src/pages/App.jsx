import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCodeVerified } from '../utils/codeAccess';

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
  const navigate = useNavigate();
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
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // After installation, navigate to dashboard or access code
          if (isCodeVerified()) {
            navigate('/dashboard');
          } else {
            navigate('/access-code');
          }
        } else {
          console.log('User dismissed the install prompt');
          // Even if dismissed, still navigate
          if (isCodeVerified()) {
            navigate('/dashboard');
          } else {
            navigate('/access-code');
          }
        }
        
        // Clear the deferredPrompt
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error showing install prompt:', error);
        // Fallback: navigate normally
        if (isCodeVerified()) {
          navigate('/dashboard');
        } else {
          navigate('/access-code');
        }
      }
    } else {
      // No install prompt available, just navigate
      if (isCodeVerified()) {
        navigate('/dashboard');
      } else {
        navigate('/access-code');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100">
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

            {/* Screenshot/Video Placeholder */}
            <div className="mb-12 animate-slide-up">
              <div className="relative w-full aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl border-2 border-primary-300/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-gray-600 font-medium text-lg">
                    App Preview Coming Soon
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Screenshot or demo video will appear here
                  </p>
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
                    <span>Open the app in Chrome or Edge browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">2.</span>
                    <span>Tap the menu (three dots) in the top right corner</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">3.</span>
                    <span>Select "Add to Home screen" or "Install app"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">4.</span>
                    <span>Tap "Install" when prompted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">5.</span>
                    <span>The app icon will appear on your home screen</span>
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
                    <span>Open the app in Safari browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">2.</span>
                    <span>Tap the Share button at the bottom</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">3.</span>
                    <span>Scroll down and select "Add to Home Screen"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">4.</span>
                    <span>Customize the name if desired, then tap "Add"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-3 mt-1">5.</span>
                    <span>The app icon will appear on your home screen</span>
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
              <p className="text-sm text-gray-500">
                {isCodeVerified() 
                  ? 'Welcome back! Continue your learning journey' 
                  : 'Enter your access code to start learning'}
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

