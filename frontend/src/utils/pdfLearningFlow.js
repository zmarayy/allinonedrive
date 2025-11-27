/**
 * PDF Learning Flow Management
 * Each PDF requires: View → Flashcards (20) → Exam (15 questions, 70%+ to pass)
 */

/**
 * Check if PDF was opened
 */
export const isPdfOpened = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-opened`;
  return localStorage.getItem(key) === 'true';
};

/**
 * Check if flashcards are completed
 */
export const areFlashcardsCompleted = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-flashcards-completed`;
  return localStorage.getItem(key) === 'true';
};

/**
 * Check if PDF exam is passed (70%+)
 */
export const isPdfExamPassed = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-exam-passed`;
  return localStorage.getItem(key) === 'true';
};

/**
 * Check if PDF is fully completed (viewed + flashcards + exam passed)
 */
export const isPdfCompleted = (dayNumber, pdfIndex) => {
  return isPdfOpened(dayNumber, pdfIndex) && 
         areFlashcardsCompleted(dayNumber, pdfIndex) && 
         isPdfExamPassed(dayNumber, pdfIndex);
};

/**
 * Check if PDF is unlocked (first PDF is always unlocked, others unlock after previous PDF is completed)
 */
export const isPdfUnlocked = (dayNumber, pdfIndex) => {
  if (pdfIndex === 0) {
    return true; // First PDF is always unlocked
  }
  // Check if previous PDF is completed
  const prevPdfCompleted = isPdfCompleted(dayNumber, pdfIndex - 1);
  const prevPdfUnlocked = localStorage.getItem(`day-${dayNumber}-pdf-${pdfIndex}-unlocked`) === 'true';
  return prevPdfCompleted || prevPdfUnlocked;
};

/**
 * Mark PDF as viewed (just opened, not completed)
 */
export const markPdfOpened = (dayNumber, pdfIndex) => {
  // Only allow opening if PDF is unlocked
  if (!isPdfUnlocked(dayNumber, pdfIndex)) {
    return false;
  }
  const key = `day-${dayNumber}-pdf-${pdfIndex}-opened`;
  localStorage.setItem(key, 'true');
  return true;
};

/**
 * Mark flashcards as completed for a PDF
 */
export const markFlashcardsCompleted = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-flashcards-completed`;
  localStorage.setItem(key, 'true');
};

/**
 * Save exam score for a PDF
 */
export const savePdfExamScore = (dayNumber, pdfIndex, score, totalQuestions) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-exam-score`;
  localStorage.setItem(key, `${score}/${totalQuestions}`);
  
  const percentage = (score / totalQuestions) * 100;
  if (percentage >= 70) {
    const passedKey = `day-${dayNumber}-pdf-${pdfIndex}-exam-passed`;
    localStorage.setItem(passedKey, 'true');
    
    // Unlock next PDF in the same day if exists
    const nextPdfIndex = pdfIndex + 1;
    const nextPdfUnlockedKey = `day-${dayNumber}-pdf-${nextPdfIndex}-unlocked`;
    localStorage.setItem(nextPdfUnlockedKey, 'true');
    
    return true; // Passed
  }
  return false; // Failed
};

/**
 * Get PDF exam score
 */
export const getPdfExamScore = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-exam-score`;
  const score = localStorage.getItem(key);
  return score ? score.split('/') : null;
};

/**
 * Get PDF completion status
 */
export const getPdfStatus = (dayNumber, pdfIndex) => {
  if (isPdfCompleted(dayNumber, pdfIndex)) {
    return 'completed';
  }
  if (isPdfExamPassed(dayNumber, pdfIndex)) {
    return 'exam-passed-needs-completion';
  }
  if (areFlashcardsCompleted(dayNumber, pdfIndex)) {
    return 'flashcards-done-needs-exam';
  }
  if (isPdfOpened(dayNumber, pdfIndex)) {
    return 'opened-needs-flashcards';
  }
  return 'not-started';
};

/**
 * Get count of completed PDFs for a day
 */
export const getCompletedPdfsForDay = (dayNumber, totalPdfs) => {
  let completed = 0;
  for (let i = 0; i < totalPdfs; i++) {
    if (isPdfCompleted(dayNumber, i)) {
      completed++;
    }
  }
  return completed;
};

/**
 * Check if all PDFs for a day are completed
 */
export const areAllPdfsCompleted = (dayNumber, totalPdfs) => {
  return getCompletedPdfsForDay(dayNumber, totalPdfs) === totalPdfs;
};

/**
 * Reset all PDF learning flow progress (for testing)
 */
export const resetPdfProgress = () => {
  for (let day = 1; day <= 7; day++) {
    // Clear all PDF-related data for up to 20 PDFs per day
    for (let pdfIndex = 0; pdfIndex < 20; pdfIndex++) {
      localStorage.removeItem(`day-${day}-pdf-${pdfIndex}-opened`);
      localStorage.removeItem(`day-${day}-pdf-${pdfIndex}-flashcards-completed`);
      localStorage.removeItem(`day-${day}-pdf-${pdfIndex}-exam-passed`);
      localStorage.removeItem(`day-${day}-pdf-${pdfIndex}-exam-score`);
      localStorage.removeItem(`day-${day}-pdf-${pdfIndex}-unlocked`);
    }
  }
};

