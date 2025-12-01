import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCodeVerified, getStoredCode, getStoredIpAddress } from '../utils/codeAccess';
import { verifyAccessCode } from '../utils/api';

/**
 * ProtectedRoute - Validates access code and IP lock
 * Ensures user has valid code and is using the same device/IP
 */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      // Check if code is verified
      if (!isCodeVerified()) {
        navigate('/access-code');
        return;
      }

      const storedCode = getStoredCode();
      const storedIp = getStoredIpAddress();

      if (!storedCode) {
        navigate('/access-code');
        return;
      }

      // DEV MODE: Skip IP validation for dev codes or localhost
      const isDevMode = storedCode.startsWith('DEV') || 
                       process.env.NODE_ENV === 'development' || 
                       window.location.hostname === 'localhost';
      
      if (isDevMode) {
        // In dev mode, just check if code is verified, skip IP validation
        setIsAuthorized(true);
        setIsValidating(false);
        return;
      }

      // PRODUCTION: Validate IP lock by re-verifying code
      // Only make API call if not in dev mode
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 5000); // 5 second timeout
        });
        
        const response = await Promise.race([
          verifyAccessCode(storedCode),
          timeoutPromise
        ]);
        
        if (response.success && response.valid) {
          // Check if IP matches
          if (storedIp && response.ipAddress && storedIp !== response.ipAddress && response.ipAddress !== 'dev-mode') {
            // IP changed - clear access and redirect
            localStorage.clear();
            navigate('/access-code');
            alert('Access code is locked to another device. Please contact support if you need to transfer access.');
            return;
          }
          
          // Update stored IP if it's the first time
          if (!storedIp && response.ipAddress && response.ipAddress !== 'dev-mode') {
            localStorage.setItem('verified_ip_address', response.ipAddress);
          }
          
          setIsAuthorized(true);
        } else {
          navigate('/access-code');
        }
      } catch (error) {
        console.error('Access validation error:', error);
        
        // If IP locked error, show message and redirect
        if (error.ipLocked) {
          localStorage.clear();
          navigate('/access-code');
          alert(error.message || 'This access code is already in use on another device.');
          return;
        }
        
        // For network errors or timeouts in dev mode, allow access if code is verified
        if (isDevMode && (error.message && (error.message.includes('Failed to fetch') || error.message.includes('timeout')))) {
          console.warn('API unavailable in dev mode, allowing access with verified code');
          setIsAuthorized(true);
          setIsValidating(false);
          return;
        }
        
        // For other errors, redirect to access code entry
        navigate('/access-code');
      } finally {
        setIsValidating(false);
      }
    };

    validateAccess();
    
    // Re-validate every 5 minutes to ensure IP lock is still valid (skip in dev mode)
    const storedCode = getStoredCode();
    const isDevMode = storedCode && (storedCode.startsWith('DEV') || 
                                    process.env.NODE_ENV === 'development' || 
                                    window.location.hostname === 'localhost');
    
    if (!isDevMode) {
      const interval = setInterval(validateAccess, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [navigate]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Validating access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return children;
}

export default ProtectedRoute;

