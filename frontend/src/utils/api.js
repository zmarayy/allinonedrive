/**
 * API Service for Backend Communication
 */

// Get API URL from environment variable or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log API URL in development (helps debug)
if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL);
}

/**
 * Get client IP address (for IP locking)
 */
const getClientIp = async () => {
  try {
    // Try to get IP from a service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not fetch IP address:', error);
    // Fallback: return a placeholder (backend will use request IP)
    return null;
  }
};

/**
 * Verify access code with backend
 * Includes IP address for device locking
 */
export const verifyAccessCode = async (code) => {
  // DEV MODE: Skip API call for dev codes
  if (code && code.startsWith('DEV')) {
    // Determine package from dev code format
    let packageType = 'standard'; // default
    if (code === 'DEVSTAND') {
      packageType = 'standard';
    } else if (code === 'DEVELITE') {
      packageType = 'elite_self_study';
    } else if (code === 'DEVLIVE') {
      packageType = 'elite_live_support';
    } else if (code === 'DEVDRIV') {
      packageType = 'driving_theory_full';
    }
    
    return {
      success: true,
      valid: true,
      package: packageType,
      ipAddress: 'dev-mode',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };
  }

  try {
    // Get client IP address
    const ipAddress = await getClientIp();

    const response = await fetch(`${API_BASE_URL}/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code,
        ipAddress: ipAddress // Send IP for locking
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if it's an expired code
      if (data.expired || response.status === 403) {
        const error = new Error(data.message || 'This access code has expired');
        error.expired = true;
        error.expiresAt = data.expiresAt;
        throw error;
      }
      // Check if it's IP locked
      if (data.ipLocked) {
        const error = new Error(data.message || 'This code is already in use on another device');
        error.ipLocked = true;
        throw error;
      }
      throw new Error(data.message || 'Failed to verify code');
    }

    return data;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

