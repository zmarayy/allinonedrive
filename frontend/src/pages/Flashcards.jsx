import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FLASHCARD_CATEGORIES, getFlashcardsByCategory, getTotalFlashcardCount } from '../data/generalFlashcards';
import BottomNavbar from '../components/BottomNavbar';

function Flashcards() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);

  // Get flashcards for selected category or show category selection
  const flashcards = selectedCategory ? getFlashcardsByCategory(selectedCategory) : [];
  const currentCard = flashcards[currentIndex];
  const totalCards = flashcards.length;
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;
  const categoryInfo = FLASHCARD_CATEGORIES.find(cat => cat.id === selectedCategory);

  const handleFlip = () => {
    if (!isFlipped && currentCard) {
      setIsFlipped(true);
      const newCount = Math.max(studiedCount, currentIndex + 1);
      setStudiedCount(newCount);
    } else {
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
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

  const handleCategorySelect = (categoryId) => {
    navigate(`/flashcards?category=${categoryId}`);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCount(0);
  };

  const handleBackToCategories = () => {
    navigate('/flashcards');
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCount(0);
  };

  // Show category selection if no category is selected
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Study Flashcards
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {getTotalFlashcardCount()} flashcards organized by category
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {FLASHCARD_CATEGORIES.map((category) => {
              const categoryFlashcards = getFlashcardsByCategory(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="glass-card p-4 sm:p-5 text-left hover:bg-white/30 transition-all duration-300 hover:scale-105 touch-manipulation"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-3xl sm:text-4xl flex-shrink-0">{category.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        {categoryFlashcards.length} flashcards
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  // Show flashcards for selected category
  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-4 py-6">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Flashcards Available</h2>
            <button
              onClick={handleBackToCategories}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back to Categories
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
            <div className="flex-1">
              <button
                onClick={handleBackToCategories}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium mb-2 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Categories
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {categoryInfo?.icon} {categoryInfo?.name}
              </h1>
            </div>
            <span className="text-sm sm:text-base text-gray-600 font-medium">
              {currentIndex + 1} / {totalCards}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className={`h-full rounded-full transition-all duration-300 ${categoryInfo?.color.replace('text-', 'bg-').replace('-800', '-600') || 'bg-primary-600'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleFlip}
            className="glass-card p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] w-full flex items-center justify-center cursor-pointer touch-manipulation active:scale-95 transition-transform"
          >
            <div className="text-center w-full">
              {!isFlipped ? (
                <div>
                  <div className="text-sm sm:text-base text-gray-500 mb-4 font-medium">Question</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
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
          >
            ← Previous
          </button>
          <button
            onClick={handleFlip}
            className="flex-1 bg-primary-600 active:bg-primary-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation"
          >
            {isFlipped ? 'Flip Back' : 'Flip Card'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            className="flex-1 bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold py-3 sm:py-4 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation"
          >
            Next →
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Flashcards;
