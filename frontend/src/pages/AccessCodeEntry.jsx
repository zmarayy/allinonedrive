import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccessCode } from '../utils/api';
import { storeCodeAccess, validateCodeFormat, normalizeCode } from '../utils/codeAccess';

function AccessCodeEntry() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Normalize code
    const normalizedCode = normalizeCode(code);

    // Validate format
    if (!validateCodeFormat(normalizedCode)) {
      setError('Please enter a valid 8-character code (letters and numbers only)');
      setLoading(false);
      return;
    }

    try {
      // Verify code with backend
      const response = await verifyAccessCode(normalizedCode);

      if (response.success && response.valid) {
        // Store code, package, expiration date, and IP address
        storeCodeAccess(normalizedCode, response.package, response.expiresAt, response.ipAddress);

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid or expired code. Please check and try again.');
      }
    } catch (err) {
      console.error('Code verification error:', err);
      // Check if it's an expired code error
      if (err.expired || (err.message && err.message.includes('expired'))) {
        setError('This access code has expired. Access codes are valid for 1 month from purchase. Please contact support if you need assistance.');
      } else {
        setError(err.message || 'Invalid or expired code. Please check and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Limit to 8 characters
    const limitedValue = value.slice(0, 8);
    setCode(limitedValue);
    setError('');
  };

  // Development mode: Skip access code and use test package
  const handleDevMode = (packageType = 'standard') => {
    // Create unique dev code based on package type
    let testCode;
    if (packageType === 'standard') {
      testCode = 'DEVSTAND';
    } else if (packageType === 'elite_self_study') {
      testCode = 'DEVELITE';
    } else if (packageType === 'elite_live_support') {
      testCode = 'DEVLIVE';
    } else if (packageType === 'driving_theory_full') {
      testCode = 'DEVDRIV';
    } else {
      testCode = 'DEVSTAND'; // default
    }
    
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    
    // Store with dev mode flag (no IP validation needed)
    storeCodeAccess(testCode, packageType, expiresAt.toISOString(), 'dev-mode');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 md:p-10 animate-fade-in">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/assets/images/allinonedrive.png"
                alt="All In One Drive Logo"
                className="h-20 sm:h-24 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Enter Your Access Code
            </h1>
            <p className="text-gray-600 font-medium">
              Enter the code you received after purchasing your package
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                Access Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={handleCodeChange}
                placeholder="A8D3F1XY"
                maxLength={8}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-center text-2xl font-bold tracking-widest uppercase"
                autoComplete="off"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                8-character code (letters and numbers)
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 8}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading || code.length !== 8
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Don't have a code?{' '}
              <a href="/packages" className="text-primary-600 hover:text-primary-700 font-semibold">
                Purchase a package
              </a>
            </p>
            
            {/* Development Mode - Enabled for client testing */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400 mb-3">Try the app here</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleDevMode('standard')}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
                >
                  Test: Standard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessCodeEntry;

