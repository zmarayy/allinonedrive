/**
 * Progress Storage Utilities
 * Makes progress code-specific - each access code has its own progress memory
 */

import { getStoredCode } from './codeAccess';

/**
 * Get the code-specific key prefix
 * If no code is stored, returns empty string (for backward compatibility during migration)
 */
const getCodePrefix = () => {
  const code = getStoredCode();
  return code ? `code-${code}-` : '';
};

/**
 * Get a code-specific localStorage key
 */
export const getProgressKey = (baseKey) => {
  const prefix = getCodePrefix();
  return `${prefix}${baseKey}`;
};

/**
 * Set a code-specific localStorage item
 */
export const setProgressItem = (baseKey, value) => {
  const key = getProgressKey(baseKey);
  localStorage.setItem(key, value);
};

/**
 * Get a code-specific localStorage item
 */
export const getProgressItem = (baseKey) => {
  const key = getProgressKey(baseKey);
  return localStorage.getItem(key);
};

/**
 * Remove a code-specific localStorage item
 */
export const removeProgressItem = (baseKey) => {
  const key = getProgressKey(baseKey);
  localStorage.removeItem(key);
};

/**
 * Clear all progress for the current code
 */
export const clearCodeProgress = () => {
  const code = getStoredCode();
  if (!code) return;
  
  const prefix = `code-${code}-`;
  
  // Get all localStorage keys
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key);
    }
  }
  
  // Remove all code-specific keys
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

/**
 * Clear all progress when switching codes
 * This should be called when a new code is entered
 */
export const clearAllProgressOnCodeChange = () => {
  // Clear all code-specific progress
  const allKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('code-')) {
      allKeys.push(key);
    }
  }
  
  // Also clear legacy progress (without code prefix) for migration
  const legacyKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('day-') || key.startsWith('lesson-') || key.startsWith('quiz-'))) {
      legacyKeys.push(key);
    }
  }
  
  // Remove all keys
  [...allKeys, ...legacyKeys].forEach(key => localStorage.removeItem(key));
};

