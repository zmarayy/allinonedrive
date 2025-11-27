import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCodeVerified } from '../utils/codeAccess';
import LanguageSelector from '../components/LanguageSelector';
import InstallButton from '../components/InstallButton';

function Home() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleStartLearning = () => {
    // Always redirect to access code entry first (this is the login page)
    navigate('/access-code');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* App Title */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
            All In One Drive
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium animate-fade-in animation-delay-200">
            Your DVSA Theory Course Companion
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-12 animate-slide-up">
          <LanguageSelector />
        </div>

        {/* Main Action Button */}
        <div className="mb-8 animate-slide-up">
          <button
            onClick={handleStartLearning}
            className="glass-button w-full max-w-md mx-auto block py-6 px-8 text-2xl font-bold text-gray-900 text-center"
          >
            {isCodeVerified() ? 'Continue Learning' : 'Start Learning'}
          </button>
        </div>

        {/* Install PWA Button */}
        {deferredPrompt && (
          <div className="animate-slide-up">
            <InstallButton deferredPrompt={deferredPrompt} setDeferredPrompt={setDeferredPrompt} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

