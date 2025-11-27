/**
 * Video Learning Flow Management
 * New flow: Video → PDF → Flashcards (20) → Exam (15 questions, 70%+ to pass)
 */

/**
 * Check if video was watched
 */
export const isVideoWatched = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-video-watched`;
  return localStorage.getItem(key) === 'true';
};

/**
 * Mark video as watched
 */
export const markVideoWatched = (dayNumber, pdfIndex) => {
  const key = `day-${dayNumber}-pdf-${pdfIndex}-video-watched`;
  localStorage.setItem(key, 'true');
};

/**
 * Check if material is unlocked (previous material must be completed)
 */
export const isMaterialUnlocked = (dayNumber, pdfIndex) => {
  // First material is always unlocked
  if (pdfIndex === 0) {
    return true;
  }
  
  // Check if previous material is completed
  const prevKey = `day-${dayNumber}-pdf-${pdfIndex - 1}-completed`;
  return localStorage.getItem(prevKey) === 'true';
};

/**
 * Get material status
 */
export const getMaterialStatus = (dayNumber, pdfIndex) => {
  const completedKey = `day-${dayNumber}-pdf-${pdfIndex}-completed`;
  const examPassedKey = `day-${dayNumber}-pdf-${pdfIndex}-exam-passed`;
  const flashcardsKey = `day-${dayNumber}-pdf-${pdfIndex}-flashcards-completed`;
  const pdfOpenedKey = `day-${dayNumber}-pdf-${pdfIndex}-opened`;
  const videoWatchedKey = `day-${dayNumber}-pdf-${pdfIndex}-video-watched`;
  
  if (localStorage.getItem(completedKey) === 'true') {
    return 'completed';
  }
  if (localStorage.getItem(examPassedKey) === 'true') {
    return 'exam-passed';
  }
  if (localStorage.getItem(flashcardsKey) === 'true') {
    return 'flashcards-done';
  }
  if (localStorage.getItem(pdfOpenedKey) === 'true') {
    return 'pdf-opened';
  }
  if (localStorage.getItem(videoWatchedKey) === 'true') {
    return 'video-watched';
  }
  return 'not-started';
};

