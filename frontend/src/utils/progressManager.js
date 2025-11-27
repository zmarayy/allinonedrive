/**
 * Progress Management for Learning App
 * Tracks day completion and unlocks next days
 */

/**
 * Check if a day is unlocked
 * Day 1 is always unlocked, others require previous day completion
 */
export const isDayUnlocked = (dayNumber) => {
  if (dayNumber === 1) {
    return true; // Day 1 is always unlocked
  }
  
  // Check if previous day is completed
  const previousDayCompleted = localStorage.getItem(`day-${dayNumber - 1}-completed`) === 'true';
  return previousDayCompleted;
};

/**
 * Mark a day as completed
 */
export const completeDay = (dayNumber) => {
  localStorage.setItem(`day-${dayNumber}-completed`, 'true');
  localStorage.setItem(`day-${dayNumber}-completed-date`, new Date().toISOString());
  
  // Unlock next day if exists
  if (dayNumber < 7) {
    localStorage.setItem(`day-${dayNumber + 1}-unlocked`, 'true');
  }
};

/**
 * Check if a day is completed
 */
export const isDayCompleted = (dayNumber) => {
  return localStorage.getItem(`day-${dayNumber}-completed`) === 'true';
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
  const key = `day-${dayNumber}-pdf-${pdfIndex}-viewed`;
  localStorage.setItem(key, 'true');
};

/**
 * Check if PDF was viewed
 */
export const isPdfViewed = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-viewed`;
  return localStorage.getItem(key) === 'true';
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
 */
export const saveQuizScore = (dayNumber, score, totalQuestions) => {
  localStorage.setItem(`day-${dayNumber}-quiz-score`, `${score}/${totalQuestions}`);
  localStorage.setItem(`day-${dayNumber}-quiz-date`, new Date().toISOString());
  
  // If score is 80% or higher, mark as quiz passed
  const percentage = (score / totalQuestions) * 100;
  if (percentage >= 80) {
    localStorage.setItem(`day-${dayNumber}-quiz-passed`, 'true');
  }
};

/**
 * Get quiz score for a day
 */
export const getQuizScore = (dayNumber) => {
  const score = localStorage.getItem(`day-${dayNumber}-quiz-score`);
  return score ? score.split('/') : null;
};

/**
 * Check if quiz is passed (80% or higher)
 */
export const isQuizPassed = (dayNumber) => {
  return localStorage.getItem(`day-${dayNumber}-quiz-passed`) === 'true';
};

/**
 * Check if day can be completed
 * Requires: All PDFs viewed + Quiz passed
 */
export const canCompleteDay = (dayNumber, totalPdfs) => {
  return areAllPdfsViewed(dayNumber, totalPdfs) && isQuizPassed(dayNumber);
};

/**
 * Reset all progress (for testing)
 * Clears all day completion, quiz, and PDF progress
 */
export const resetProgress = () => {
  for (let day = 1; day <= 7; day++) {
    // Day completion data
    localStorage.removeItem(`day-${day}-completed`);
    localStorage.removeItem(`day-${day}-completed-date`);
    localStorage.removeItem(`day-${day}-unlocked`);
    
    // Quiz data
    localStorage.removeItem(`day-${day}-quiz-score`);
    localStorage.removeItem(`day-${day}-quiz-date`);
    localStorage.removeItem(`day-${day}-quiz-passed`);
    
    // Old PDF viewed flags (legacy)
    for (let i = 0; i < 20; i++) {
      localStorage.removeItem(`day-${day}-pdf-${i}-viewed`);
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

