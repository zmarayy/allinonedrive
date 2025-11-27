/**
 * Access Code Management Utilities
 */

const CODE_STORAGE_KEY = 'access_code';
const PACKAGE_STORAGE_KEY = 'user_package';
const CODE_VERIFIED_KEY = 'code_verified';
const EXPIRES_AT_KEY = 'code_expires_at';
const IP_ADDRESS_KEY = 'verified_ip_address';

/**
 * Get stored access code
 */
export const getStoredCode = () => {
  return localStorage.getItem(CODE_STORAGE_KEY);
};

/**
 * Get stored package type
 */
export const getStoredPackage = () => {
  return localStorage.getItem(PACKAGE_STORAGE_KEY);
};

/**
 * Check if code is verified and not expired
 */
export const isCodeVerified = () => {
  const verified = localStorage.getItem(CODE_VERIFIED_KEY) === 'true';
  if (!verified) {
    return false;
  }

  // Check expiration
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
  if (!expiresAt) {
    // If no expiration date stored, assume it's valid (for backward compatibility)
    return true;
  }

  const now = new Date();
  const expirationDate = new Date(expiresAt);
  
  if (now > expirationDate) {
    // Code has expired - clear it
    clearCodeAccess();
    return false;
  }

  return true;
};

/**
 * Store access code and package
 */
export const storeCodeAccess = (code, packageType, expiresAt = null, ipAddress = null) => {
  localStorage.setItem(CODE_STORAGE_KEY, code);
  localStorage.setItem(PACKAGE_STORAGE_KEY, packageType);
  localStorage.setItem(CODE_VERIFIED_KEY, 'true');
  if (expiresAt) {
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
  }
  if (ipAddress) {
    localStorage.setItem(IP_ADDRESS_KEY, ipAddress);
  }
};

/**
 * Get stored IP address
 */
export const getStoredIpAddress = () => {
  return localStorage.getItem(IP_ADDRESS_KEY);
};

/**
 * Clear access code and package (logout)
 */
export const clearCodeAccess = () => {
  localStorage.removeItem(CODE_STORAGE_KEY);
  localStorage.removeItem(PACKAGE_STORAGE_KEY);
  localStorage.removeItem(CODE_VERIFIED_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  localStorage.removeItem(IP_ADDRESS_KEY);
};

/**
 * Get expiration date
 */
export const getExpirationDate = () => {
  return localStorage.getItem(EXPIRES_AT_KEY);
};

/**
 * Check if code is expired
 */
export const isCodeExpired = () => {
  const expiresAt = getExpirationDate();
  if (!expiresAt) {
    return false; // No expiration date means not expired (backward compatibility)
  }

  const now = new Date();
  const expirationDate = new Date(expiresAt);
  return now > expirationDate;
};

/**
 * Validate code format (8-character alphanumeric)
 */
export const validateCodeFormat = (code) => {
  const codeRegex = /^[A-Z0-9]{8}$/;
  return codeRegex.test(code.toUpperCase().replace(/\s/g, ''));
};

/**
 * Normalize code (uppercase, remove spaces)
 */
export const normalizeCode = (code) => {
  return code.toUpperCase().replace(/\s/g, '');
};

