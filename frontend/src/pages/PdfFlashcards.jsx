import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_FLASHCARDS } from '../data/pdfContent';
import { markFlashcardsCompleted, isPdfOpened } from '../utils/pdfLearningFlow';
import BottomNavbar from '../components/BottomNavbar';

function PdfFlashcards() {
  const { day, pdfIndex } = useParams();
  const navigate = useNavigate();
  const dayNumber = parseInt(day);
  const pdfIdx = parseInt(pdfIndex);
  
  const flashcards = PDF_FLASHCARDS[dayNumber]?.[pdfIdx] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);
  
  // Check if PDF was opened (studied) first (video is optional)
  const hasStudied = isPdfOpened(dayNumber, pdfIdx);
  
  const currentCard = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
  // Must study all 20 flashcards to complete
  const allStudied = flashcards.length > 0 && studiedCount >= flashcards.length;

  useEffect(() => {
    // Load studied count from localStorage
    const key = `day-${dayNumber}-pdf-${pdfIdx}-flashcards-studied`;
    const studied = parseInt(localStorage.getItem(key) || '0');
    setStudiedCount(studied);
  }, [dayNumber, pdfIdx]);

  const handleFlip = () => {
    // Always allow flipping - no restrictions
    setIsFlipped(!isFlipped);
    // Mark as studied when flipped to answer (first time)
    if (!isFlipped) {
      const key = `day-${dayNumber}-pdf-${pdfIdx}-flashcards-studied`;
      const newCount = Math.max(studiedCount, currentIndex + 1);
      localStorage.setItem(key, newCount.toString());
      setStudiedCount(newCount);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleComplete = () => {
    markFlashcardsCompleted(dayNumber, pdfIdx);
    navigate(`/pdf-exam/${dayNumber}/${pdfIdx}`);
  };

  // Redirect if hasn't studied PDF first
  useEffect(() => {
    if (!hasStudied && dayNumber && pdfIdx !== undefined) {
      navigate('/course-content');
    }
  }, [hasStudied, dayNumber, pdfIdx, navigate]);

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Flashcards Available</h2>
            <button
              onClick={() => navigate('/course-content')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back to Course
            </button>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!hasStudied) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="text-5xl mb-4">📖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Study the Material First!
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              You must study the material before accessing flashcards.
            </p>
            <button
              onClick={() => navigate('/course-content')}
              className="w-full bg-primary-600 active:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg min-h-[48px] touch-manipulation"
            >
              Back to Course Content
            </button>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-3xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Flashcards</h1>
            <span className="text-sm sm:text-base text-gray-600 font-medium">
              {currentIndex + 1} / {flashcards.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-primary-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleFlip}
            className="glass-card p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] w-full flex items-center justify-center cursor-pointer touch-manipulation active:scale-[0.98] transition-transform"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="text-center w-full">
              {!isFlipped ? (
                <div>
                  <div className="text-sm sm:text-base text-gray-500 mb-4 font-medium">Question</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {currentCard.front}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 mt-6 font-medium">Tap to reveal answer</p>
                </div>
              ) : (
                <div>
                  <div className="text-sm sm:text-base text-gray-500 mb-4 font-medium">Answer</div>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed">
                    {currentCard.back}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500 mt-6 font-medium">Tap to flip back</p>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 sm:gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1 bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Previous flashcard"
          >
            ← Previous
          </button>
          <button
            onClick={handleFlip}
            className="flex-1 bg-primary-600 active:bg-primary-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation shadow-md active:shadow-lg"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={isFlipped ? 'Flip back to question' : 'Flip to see answer'}
          >
            {isFlipped ? 'Flip Back' : 'Flip Card'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex-1 bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Next flashcard"
          >
            Next →
          </button>
        </div>

        {/* Complete Button - Only show when all 20 flashcards are studied */}
        {allStudied && flashcards.length === 20 && (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
              <p className="text-green-800 font-semibold text-sm text-center">
                ✅ All 20 flashcards completed! Ready for exam.
              </p>
            </div>
            <button
              onClick={handleComplete}
              className="w-full bg-green-600 active:bg-green-700 text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-6 rounded-xl transition-all shadow-lg active:shadow-xl transform active:scale-95 min-h-[56px] touch-manipulation"
            >
              📝 Take Exam (15 Questions)
            </button>
          </div>
        )}
        
        {/* Progress indicator if not all studied */}
        {!allStudied && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 font-semibold text-xs sm:text-sm text-center">
              Study all {flashcards.length} flashcards to unlock the exam
            </p>
          </div>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default PdfFlashcards;

