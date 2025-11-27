/**
 * Package Access Control Utilities
 * Determines what content is available based on purchased package
 */

import { getStoredPackage } from './codeAccess';

/**
 * Package types
 */
export const PACKAGE_TYPES = {
  STANDARD: 'standard',
  ELITE_SELF_STUDY: 'elite_self_study',
  ELITE_LIVE_SUPPORT: 'elite_live_support',
  DRIVING_THEORY_FULL: 'driving_theory_full',
};

/**
 * Get current user's package
 */
export const getUserPackage = () => {
  return getStoredPackage();
};

/**
 * Check if user has access to a feature
 */
export const hasAccess = (feature) => {
  const packageType = getUserPackage();
  
  if (!packageType) {
    return false;
  }

  switch (feature) {
    // All packages have these
    case 'pdfs':
    case 'odt_word':
    case 'downloadable_resources':
      return true;

    // Videos - Elite packages and above
    case 'videos':
    case 'embedded_videos':
      return [
        PACKAGE_TYPES.ELITE_SELF_STUDY,
        PACKAGE_TYPES.ELITE_LIVE_SUPPORT,
        PACKAGE_TYPES.DRIVING_THEORY_FULL,
      ].includes(packageType);

    // Flashcards - All packages
    case 'flashcards':
      return true;

    // Quizzes - Elite packages and above
    case 'quizzes':
      return [
        PACKAGE_TYPES.ELITE_SELF_STUDY,
        PACKAGE_TYPES.ELITE_LIVE_SUPPORT,
        PACKAGE_TYPES.DRIVING_THEORY_FULL,
      ].includes(packageType);

    // Live Support - Elite Live Support and Full Package
    case 'live_support':
      return [
        PACKAGE_TYPES.ELITE_LIVE_SUPPORT,
        PACKAGE_TYPES.DRIVING_THEORY_FULL,
      ].includes(packageType);

    // Driving lessons - Only Full Package
    case 'driving_lessons':
      return packageType === PACKAGE_TYPES.DRIVING_THEORY_FULL;

    default:
      return false;
  }
};

/**
 * Get package display name
 */
export const getPackageDisplayName = (packageType) => {
  const names = {
    [PACKAGE_TYPES.STANDARD]: 'Standard Package',
    [PACKAGE_TYPES.ELITE_SELF_STUDY]: 'Elite Self-Study',
    [PACKAGE_TYPES.ELITE_LIVE_SUPPORT]: 'Elite Live Support',
    [PACKAGE_TYPES.DRIVING_THEORY_FULL]: 'Driving + Theory Full Package',
  };
  return names[packageType] || 'Unknown Package';
};

/**
 * Get list of unlocked features for current package
 */
export const getUnlockedFeatures = () => {
  const packageType = getUserPackage();
  const features = [];

  if (!packageType) {
    return features;
  }

  // All packages
  features.push('PDF Notes', 'ODT/Word Notes', 'Downloadable Resources', 'Flashcards');

  // Elite packages and above
  if (hasAccess('videos')) {
    features.push('Embedded Videos');
  }

  if (hasAccess('quizzes')) {
    features.push('Quizzes');
  }

  // Live Support packages
  if (hasAccess('live_support')) {
    features.push('Live Support Sessions');
  }

  // Full Package
  if (hasAccess('driving_lessons')) {
    features.push('Driving Lessons');
  }

  return features;
};

