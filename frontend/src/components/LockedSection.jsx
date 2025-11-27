import React from 'react';
import { getPackageDisplayName } from '../utils/packageAccess';

function LockedSection({ title, message, currentPackage, requiredPackage }) {

  const packageNames = {
    standard: 'Standard Theory Package',
    elite: 'Elite Self-Study Package',
    pro: 'Pro Package',
    ultimate_pro: 'Ultimate Pro Package'
  };

  const handleUpgrade = () => {
    // Navigate to packages page (on main website)
    window.open('/packages', '_blank');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass-card p-8 md:p-12 max-w-md w-full text-center animate-fade-in">
        {/* Lock Icon */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {title} Locked
        </h2>

        {/* Message */}
        <p className="text-gray-600 font-medium mb-6">
          {message}
        </p>

        {/* Current Package Info */}
        {currentPackage && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Your Current Package:</p>
            <p className="font-semibold text-gray-900">
              {getPackageDisplayName(currentPackage)}
            </p>
          </div>
        )}

        {/* Required Package Info */}
        <div className="bg-primary-50 p-4 rounded-lg mb-6 border border-primary-200">
          <p className="text-sm text-primary-700 mb-1">Required Package:</p>
          <p className="font-bold text-primary-900 text-lg">
            {packageNames[requiredPackage]}
          </p>
        </div>

        {/* Upgrade Button */}
        <button
          onClick={handleUpgrade}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Upgrade Package
        </button>

        {/* Info Note */}
        <p className="text-xs text-gray-500 mt-4">
          Contact us if you need help upgrading your package
        </p>
      </div>
    </div>
  );
}

export default LockedSection;

