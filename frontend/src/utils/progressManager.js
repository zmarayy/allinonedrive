/**
 * Progress Management for Learning App
 * Tracks day completion and unlocks next days
 * Now code-specific - each access code has its own progress
 */

import { setProgressItem, getProgressItem, removeProgressItem } from './progressStorage';

/**
 * Check if a day is unlocked
 * Day 1 is always unlocked, others require previous day completion
 */
export const isDayUnlocked = (dayNumber) => {
  if (dayNumber === 1) {
    return true; // Day 1 is always unlocked
  }
  
  // Check if previous day is completed (code-specific)
  const previousDayCompleted = getProgressItem(`day-${dayNumber - 1}-completed`) === 'true';
  return previousDayCompleted;
};

/**
 * Mark a day as completed
 */
export const completeDay = (dayNumber) => {
  setProgressItem(`day-${dayNumber}-completed`, 'true');
  setProgressItem(`day-${dayNumber}-completed-date`, new Date().toISOString());
  
  // Unlock next day if exists
  if (dayNumber < 7) {
    setProgressItem(`day-${dayNumber + 1}-unlocked`, 'true');
  }
};

/**
 * Check if a day is completed
 */
export const isDayCompleted = (dayNumber) => {
  return getProgressItem(`day-${dayNumber}-completed`) === 'true';
};

/**
 * Get day progress status
 */
export const getDayStatus = (dayNumber) => {
  if (isDayCompleted(dayNumber)) {
    return 'completed';
  }
  if (isDayUnlocked(dayNumber)) {
    return 'in-progress';
  }
  return 'locked';
};

/**
 * Get overall progress (0-100)
 */
export const getOverallProgress = () => {
  let completed = 0;
  for (let day = 1; day <= 7; day++) {
    if (isDayCompleted(day)) {
      completed++;
    }
  }
  return Math.round((completed / 7) * 100);
};

/**
 * Get completed days count
 */
export const getCompletedDaysCount = () => {
  let count = 0;
  for (let day = 1; day <= 7; day++) {
    if (isDayCompleted(day)) {
      count++;
    }
  }
  return count;
};

/**
 * Mark PDF as viewed for a day
 */
export const markPdfViewed = (dayNumber, pdfIndex) => {
  setProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-viewed`, 'true');
};

/**
 * Check if PDF was viewed
 */
export const isPdfViewed = (dayNumber, pdfIndex) => {
  return getProgressItem(`day-${dayNumber}-pdf-${pdfIndex}-viewed`) === 'true';
};

/**
 * Get all viewed PDFs for a day
 */
export const getViewedPdfsForDay = (dayNumber, totalPdfs) => {
  let viewed = 0;
  for (let i = 0; i < totalPdfs; i++) {
    if (isPdfViewed(dayNumber, i)) {
      viewed++;
    }
  }
  return viewed;
};

/**
 * Check if all PDFs for a day are viewed
 */
export const areAllPdfsViewed = (dayNumber, totalPdfs) => {
  return getViewedPdfsForDay(dayNumber, totalPdfs) === totalPdfs;
};

/**
 * Save quiz score for a day
 * NEW: Requires 70% to pass and unlock next day
 */
export const saveQuizScore = (dayNumber, score, totalQuestions) => {
  setProgressItem(`day-${dayNumber}-quiz-score`, `${score}/${totalQuestions}`);
  setProgressItem(`day-${dayNumber}-quiz-date`, new Date().toISOString());
  
  // If score is 70% or higher, mark as quiz passed and complete the day
  const percentage = (score / totalQuestions) * 100;
  if (percentage >= 70) {
    setProgressItem(`day-${dayNumber}-quiz-passed`, 'true');
    // Automatically complete the day and unlock next day
    completeDay(dayNumber);
    return true; // Passed
  }
  return false; // Failed
};

/**
 * Get quiz score for a day
 */
export const getQuizScore = (dayNumber) => {
  const score = getProgressItem(`day-${dayNumber}-quiz-score`);
  return score ? score.split('/') : null;
};

/**
 * Check if quiz is passed (70% or higher)
 */
export const isQuizPassed = (dayNumber) => {
  return getProgressItem(`day-${dayNumber}-quiz-passed`) === 'true';
};

/**
 * Check if day can be completed
 * NEW: Only requires quiz to be passed (70%+)
 */
export const canCompleteDay = (dayNumber) => {
  return isQuizPassed(dayNumber);
};

/**
 * Reset all progress (for testing)
 * Clears all day completion, quiz, and PDF progress
 */
export const resetProgress = () => {
  for (let day = 1; day <= 7; day++) {
    // Day completion data (code-specific)
    removeProgressItem(`day-${day}-completed`);
    removeProgressItem(`day-${day}-completed-date`);
    removeProgressItem(`day-${day}-unlocked`);
    
    // Quiz data (code-specific)
    removeProgressItem(`day-${day}-quiz-score`);
    removeProgressItem(`day-${day}-quiz-date`);
    removeProgressItem(`day-${day}-quiz-passed`);
    
    // Old PDF viewed flags (code-specific)
    for (let i = 0; i < 20; i++) {
      removeProgressItem(`day-${day}-pdf-${i}-viewed`);
    }
  }
};

/**
 * Reset ALL progress including PDF learning flow
 * This is the comprehensive reset function
 */
export const resetAllProgress = () => {
  resetProgress();
  
  // Import and call PDF progress reset
  // Note: This will be called from the component that imports both
  // For now, we'll handle it in the Dashboard component
};

