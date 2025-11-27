import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { markPdfOpened, isPdfOpened, areFlashcardsCompleted, isPdfExamPassed, isPdfCompleted, getPdfStatus, isPdfUnlocked } from '../utils/pdfLearningFlow';

function PdfPreviewCard({ title, description, fileSize, filePath, downloadPath, dayNumber, pdfIndex, onPdfViewed }) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfStatus, setPdfStatus] = useState('not-started');

  useEffect(() => {
    if (dayNumber && pdfIndex !== undefined) {
      const status = getPdfStatus(dayNumber, pdfIndex);
      setPdfStatus(status);
      // Force re-render to update button state
    }
  }, [dayNumber, pdfIndex]);

  // Refresh status when modal is shown
  useEffect(() => {
    if (showPreview && dayNumber && pdfIndex !== undefined) {
      const status = getPdfStatus(dayNumber, pdfIndex);
      setPdfStatus(status);
    }
  }, [showPreview, dayNumber, pdfIndex]);

  const handlePreview = () => {
    setShowPreview(true);
    setIsLoading(true);
    
    // Mark PDF as opened (not completed) when first viewed
    if (dayNumber && pdfIndex !== undefined && !isPdfOpened(dayNumber, pdfIndex)) {
      markPdfOpened(dayNumber, pdfIndex);
      // Force status update immediately
      const newStatus = getPdfStatus(dayNumber, pdfIndex);
      setPdfStatus(newStatus);
      if (onPdfViewed) {
        onPdfViewed(dayNumber, pdfIndex);
      }
    } else {
      // Refresh status even if already opened
      const currentStatus = getPdfStatus(dayNumber, pdfIndex);
      setPdfStatus(currentStatus);
    }
  };

  const handleStartFlashcards = () => {
    navigate(`/pdf-flashcards/${dayNumber}/${pdfIndex}`);
  };

  const handleStartExam = () => {
    navigate(`/pdf-exam/${dayNumber}/${pdfIndex}`);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    // Refresh status when closing
    if (dayNumber && pdfIndex !== undefined) {
      setPdfStatus(getPdfStatus(dayNumber, pdfIndex));
    }
  };

  // Recalculate status on every render to ensure it's up-to-date
  const isUnlocked = isPdfUnlocked(dayNumber, pdfIndex);
  const isCompleted = isPdfCompleted(dayNumber, pdfIndex);
  const hasStudied = isPdfOpened(dayNumber, pdfIndex);
  const flashcardsDone = areFlashcardsCompleted(dayNumber, pdfIndex);
  const examPassed = isPdfExamPassed(dayNumber, pdfIndex);

  return (
    <>
      <div className={`bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm transition-all duration-300 ${
        !isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="bg-emerald-100 rounded-lg p-2 sm:p-2.5 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 leading-tight">
                {title}
              </h4>
              {description && (
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button - Mobile Optimized (Preview Only) */}
        <div className="mt-4">
          {!isUnlocked ? (
            <div className="w-full bg-gray-200 text-gray-500 font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg flex items-center justify-center space-x-2 min-h-[48px]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Complete Previous Material to Unlock</span>
            </div>
          ) : isCompleted ? (
            <div className="w-full space-y-2">
              <div className="w-full bg-green-100 text-green-700 font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg flex items-center justify-center space-x-2 min-h-[48px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Material Completed ✓</span>
              </div>
              <div className="w-full flex gap-2">
                <button
                  onClick={handlePreview}
                  className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 min-h-[48px] touch-manipulation shadow-md hover:shadow-lg"
                  title="View PDF again"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">PDF</span>
                  <span className="sm:hidden">📄</span>
                </button>
                <button
                  onClick={() => navigate(`/pdf-flashcards/${dayNumber}/${pdfIndex}`)}
                  className="flex-1 bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 min-h-[48px] touch-manipulation shadow-md hover:shadow-lg"
                  title="Redo this material"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Redo</span>
                  <span className="sm:hidden">🔄</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handlePreview}
              className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 min-h-[48px] touch-manipulation shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Study This Material</span>
            </button>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - Mobile Optimized */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-none sm:rounded-lg shadow-2xl w-full h-full sm:w-full sm:max-w-6xl sm:max-h-[90vh] flex flex-col">
            {/* Modal Header - Mobile Optimized */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 truncate pr-2">{title}</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 active:text-gray-700 transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Close preview"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer - Mobile Optimized */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-50">
              {isLoading && (
                <div className="flex items-center justify-center h-64 sm:h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              )}
              <iframe
                src={`${filePath}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full min-h-[400px] sm:min-h-[600px] rounded-lg border border-gray-200"
                title={title}
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </div>

            {/* Modal Footer - Mobile Optimized */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              {(() => {
                // Recalculate status fresh each render to ensure accuracy
                const currentStatus = getPdfStatus(dayNumber, pdfIndex);
                const isCompletedNow = isPdfCompleted(dayNumber, pdfIndex);
                const hasStudiedNow = isPdfOpened(dayNumber, pdfIndex);
                const flashcardsDoneNow = areFlashcardsCompleted(dayNumber, pdfIndex);
                const examPassedNow = isPdfExamPassed(dayNumber, pdfIndex);

                if (isCompletedNow) {
                  return (
                    <div className="space-y-2">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 font-semibold text-sm text-center">✅ Material Complete!</p>
                      </div>
                      <button
                        onClick={() => {
                          handleClosePreview();
                          navigate(`/pdf-flashcards/${dayNumber}/${pdfIndex}`);
                        }}
                        className="w-full bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        🔄 Redo Material
                      </button>
                      <button
                        onClick={handleClosePreview}
                        className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        Close & Continue to Next Material
                      </button>
                    </div>
                  );
                } else if (examPassedNow && !isCompletedNow) {
                  return (
                    <div className="space-y-2">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                        <p className="text-amber-800 font-semibold text-xs sm:text-sm text-center">
                          Exam passed! Complete this material to continue.
                        </p>
                      </div>
                      <button
                        onClick={handleClosePreview}
                        className="bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-8 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation w-full"
                      >
                        Close
                      </button>
                    </div>
                  );
                } else if (flashcardsDoneNow && !examPassedNow) {
                  return (
                    <div className="space-y-2">
                      <button
                        onClick={handleStartExam}
                        className="w-full bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        📝 Take Exam (15 Questions)
                      </button>
                      <button
                        onClick={handleClosePreview}
                        className="w-full bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        Close
                      </button>
                    </div>
                  );
                } else if (hasStudiedNow && !flashcardsDoneNow) {
                  return (
                    <div className="space-y-2">
                      <button
                        onClick={handleStartFlashcards}
                        className="w-full bg-primary-600 active:bg-primary-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        🎴 Study Flashcards (20 cards)
                      </button>
                      <button
                        onClick={handleClosePreview}
                        className="w-full bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                      >
                        Close
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <button
                      onClick={handleClosePreview}
                      className="bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-8 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation w-full"
                    >
                      Close & Study Flashcards Next
                    </button>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfPreviewCard;

