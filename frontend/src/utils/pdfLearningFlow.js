/**
 * PDF Learning Flow Management
 * New simplified flow: Video (optional) → PDF (all unlocked from start)
 * End-of-day exam (70%+) unlocks next day
 * Now code-specific - each access code has its own progress
 */

import { setProgressItem, getProgressItem, removeProgressItem } from './progressStorage';

/**
 * Check if PDF was opened
 */
export const isPdfOpened = (dayNumber, pdfIndex) => {
  return getProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-opened`) === 'true';
};

/**
 * Check if video was watched
 */
export const isVideoWatched = (dayNumber, pdfIndex) => {
  return getProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-video-watched`) === 'true';
};

/**
 * Mark video as watched
 */
export const markVideoWatched = (dayNumber, pdfIndex) => {
  setProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-video-watched`, 'true');
};

/**
 * Check if PDF is unlocked
 * NEW: All PDFs in a day are unlocked from the start
 */
export const isPdfUnlocked = (dayNumber, pdfIndex) => {
  // All PDFs in an unlocked day are available from the start
  // Day unlocking is handled by progressManager
  return true; // Always unlocked if day is unlocked
};

/**
 * Check if PDF is completed (simplified - just opened)
 */
export const isPdfCompleted = (dayNumber, pdfIndex) => {
  return isPdfOpened(dayNumber, pdfIndex);
};

/**
 * Mark PDF as viewed (just opened)
 */
export const markPdfOpened = (dayNumber, pdfIndex) => {
  setProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-opened`, 'true');
  return true;
};

/**
 * Get PDF completion status (simplified)
 */
export const getPdfStatus = (dayNumber, pdfIndex) => {
  if (isPdfOpened(dayNumber, pdfIndex)) {
    return 'opened';
  }
  return 'not-opened';
};

/**
 * Get count of opened PDFs for a day (for progress tracking)
 */
export const getOpenedPdfsForDay = (dayNumber, totalPdfs) => {
  let opened = 0;
  for (let i = 0; i < totalPdfs; i++) {
    if (isPdfOpened(dayNumber, i)) {
      opened++;
    }
  }
  return opened;
};

/**
 * Reset all PDF learning flow progress (for testing)
 */
export const resetPdfProgress = () => {
  for (let day = 1; day <= 7; day++) {
    // Clear all PDF-related data for up to 20 PDFs per day (code-specific)
    for (let pdfIndex = 0; pdfIndex < 20; pdfIndex++) {
      removeProgressItem(`day-${day}-pdf-${pdfIndex}-opened`);
      removeProgressItem(`day-${day}-pdf-${pdfIndex}-video-watched`);
    }
  }
};

