import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { markPdfOpened, isPdfOpened, areFlashcardsCompleted, isPdfExamPassed, isPdfCompleted, isPdfUnlocked, isVideoWatched, markVideoWatched } from '../utils/pdfLearningFlow';
import VideoPlayer from './VideoPlayer';

function PdfPreviewCard({ title, description, fileSize, filePath, downloadPath, videoPath, youtubeVideoId, dayNumber, pdfIndex, onPdfViewed }) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const cardRef = useRef(null);

  const handlePreview = (e) => {
    // Validate filePath exists
    if (!filePath) {
      console.error('PDF filePath is missing for:', title);
      alert('Error: PDF file not found. Please contact support.');
      return;
    }
    
    // Center modal in viewport - no need to track button position
    setShowPreview(true);
    setIsLoading(true);
    setLoadError(false);
    
    // Mark PDF as opened (not completed) when first viewed
    if (dayNumber && pdfIndex !== undefined && !isPdfOpened(dayNumber, pdfIndex)) {
      markPdfOpened(dayNumber, pdfIndex);
      setStatusUpdate(prev => prev + 1); // Force re-render
      if (onPdfViewed) {
        onPdfViewed(dayNumber, pdfIndex);
      }
    }
    
    // Set timeout to stop loading after 10 seconds
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsLoading(prev => {
        if (prev) {
          setLoadError(true);
          return false;
        }
        return prev;
      });
    }, 10000);
  };
  
  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showPreview) {
          setShowPreview(false);
          setIsLoading(true);
          setLoadError(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
        if (showVideoModal) {
          setShowVideoModal(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPreview, showVideoModal]);
  
  // Modals are now centered, no need for scroll effects
  
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
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
    setIsLoading(true);
    setLoadError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  // Check if we're on mobile (with safe check for SSR/build time)
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // State to force re-render when status changes (value not read, but setter triggers re-renders)
  // eslint-disable-next-line no-unused-vars
  const [statusUpdate, setStatusUpdate] = useState(0);
  
  // Recalculate status on every render to ensure it's up-to-date
  const isUnlocked = isPdfUnlocked(dayNumber, pdfIndex);
  const isCompleted = isPdfCompleted(dayNumber, pdfIndex);
  const hasVideo = videoPath || youtubeVideoId;
  const videoWatched = hasVideo ? isVideoWatched(dayNumber, pdfIndex) : true; // If no video, consider it "watched"
  const pdfOpened = isPdfOpened(dayNumber, pdfIndex);
  const flashcardsDone = areFlashcardsCompleted(dayNumber, pdfIndex);
  const examPassed = isPdfExamPassed(dayNumber, pdfIndex);
  
  // Refresh status periodically and when modal closes
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusUpdate(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const handleVideoWatched = () => {
    if (hasVideo && !videoWatched) {
      markVideoWatched(dayNumber, pdfIndex);
      setStatusUpdate(prev => prev + 1); // Force re-render
      if (onPdfViewed) {
        onPdfViewed(dayNumber, pdfIndex);
      }
    }
  };
  
  const handleVideoClick = (e) => {
    // Center modal in viewport - no need to track button position
    setShowVideoModal(true);
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={`bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm transition-all duration-300 ${
          !isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
        }`}
      >
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

        {/* Action Buttons - Learning Flow: Video → PDF → Flashcards → Exam */}
        <div className="mt-4 space-y-2">
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
                {hasVideo && (
                  <button
                    onClick={handleVideoClick}
                    className="flex-1 bg-purple-600 active:bg-purple-700 text-white font-semibold text-sm sm:text-base px-3 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-1 min-h-[44px] sm:min-h-[48px] touch-manipulation shadow-md"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="hidden sm:inline text-xs sm:text-sm">Video</span>
                    <span className="sm:hidden">🎥</span>
                  </button>
                )}
                <button
                  onClick={handlePreview}
                  className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-3 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-1 min-h-[44px] sm:min-h-[48px] touch-manipulation shadow-md"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline text-xs sm:text-sm">PDF</span>
                  <span className="sm:hidden">📄</span>
                </button>
                <button
                  onClick={() => navigate(`/pdf-flashcards/${dayNumber}/${pdfIndex}`)}
                  className="flex-1 bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-3 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-1 min-h-[44px] sm:min-h-[48px] touch-manipulation shadow-md"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline text-xs sm:text-sm">Redo</span>
                  <span className="sm:hidden">🔄</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Step 1: Watch Video (if available) */}
              {hasVideo && !videoWatched && (
                <button
                  onClick={handleVideoClick}
                  className="w-full bg-purple-600 active:bg-purple-700 text-white font-semibold text-sm sm:text-base px-4 py-3.5 sm:py-3 rounded-xl transition-all flex items-center justify-center space-x-2 min-h-[52px] sm:min-h-[48px] touch-manipulation shadow-lg active:scale-[0.98]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="font-bold">📹 Watch Video First (Recommended)</span>
                </button>
              )}
              
              {/* Step 2: Study PDF */}
              {videoWatched && !pdfOpened && (
                <button
                  onClick={handlePreview}
                  className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3.5 sm:py-3 rounded-xl transition-all flex items-center justify-center space-x-2 min-h-[52px] sm:min-h-[48px] touch-manipulation shadow-lg active:scale-[0.98]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-bold">📚 Study This Material</span>
                </button>
              )}
              
              {/* Step 3: Study Flashcards */}
              {pdfOpened && !flashcardsDone && (
                <button
                  onClick={() => navigate(`/pdf-flashcards/${dayNumber}/${pdfIndex}`)}
                  className="w-full bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 py-3.5 sm:py-3 rounded-xl transition-all flex items-center justify-center space-x-2 min-h-[52px] sm:min-h-[48px] touch-manipulation shadow-lg active:scale-[0.98]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-bold">🎴 Study Flashcards (20 cards)</span>
                </button>
              )}
              
              {/* Step 4: Take Exam */}
              {flashcardsDone && !examPassed && (
                <button
                  onClick={() => navigate(`/pdf-exam/${dayNumber}/${pdfIndex}`)}
                  className="w-full bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm sm:text-base px-4 py-3.5 sm:py-3 rounded-xl transition-all flex items-center justify-center space-x-2 min-h-[52px] sm:min-h-[48px] touch-manipulation shadow-lg active:scale-[0.98]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-bold">📝 Take Exam (15 Questions)</span>
                </button>
              )}
              
              {/* If no video, show PDF button directly */}
              {!hasVideo && !pdfOpened && (
                <button
                  onClick={handlePreview}
                  className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3.5 sm:py-3 rounded-xl transition-all flex items-center justify-center space-x-2 min-h-[52px] sm:min-h-[48px] touch-manipulation shadow-lg active:scale-[0.98]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-bold">📚 Study This Material</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - Mobile Optimized */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto"
          onClick={handleClosePreview}
          style={{ 
            paddingTop: 'env(safe-area-inset-top)', 
            paddingBottom: 'env(safe-area-inset-bottom)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <div 
            className={`bg-white rounded-lg shadow-2xl w-full flex flex-col ${
              isMobile ? 'max-w-sm max-h-[90vh]' : 'max-w-2xl max-h-[90vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Mobile Optimized */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
              <h3 className="text-sm font-bold text-gray-900 flex-1 truncate pr-2">{title}</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 active:text-gray-700 transition-colors p-1 min-w-[36px] min-h-[36px] flex items-center justify-center touch-manipulation"
                aria-label="Close preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer - Mobile Optimized */}
            <div className="overflow-auto bg-gray-50">
              {/* Show iframe only on desktop, direct link on mobile */}
              {!isMobile ? (
                <>
                  {isLoading && !loadError && (
                    <div className="flex flex-col items-center justify-center h-64 sm:h-96">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                      <p className="ml-4 text-gray-600 font-medium mt-4">Loading PDF...</p>
                    </div>
                  )}
                  {loadError && filePath && (
                    <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                      <div className="text-4xl mb-4">📄</div>
                      <p className="text-gray-700 font-semibold mb-2 text-center">PDF couldn't load in viewer</p>
                      <p className="text-gray-600 text-sm mb-4 text-center">Try opening it directly instead</p>
                      <a
                        href={filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors min-h-[48px] touch-manipulation"
                      >
                        Open PDF in New Tab
                      </a>
                    </div>
                  )}
                  {loadError && !filePath && (
                    <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                      <div className="text-4xl mb-4">⚠️</div>
                      <p className="text-gray-700 font-semibold mb-2 text-center">PDF file not found</p>
                      <p className="text-gray-600 text-sm mb-4 text-center">Please contact support if this issue persists.</p>
                    </div>
                  )}
                  {!loadError && filePath && (
                    <iframe
                      ref={iframeRef}
                      src={`${filePath}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width`}
                      className="w-full h-full min-h-[400px] sm:min-h-[600px] rounded-lg border border-gray-200"
                      title={title}
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                      style={{ 
                        display: isLoading ? 'none' : 'block',
                        touchAction: 'pan-x pan-y pinch-zoom'
                      }}
                      allow="fullscreen"
                    />
                  )}
                  {!filePath && (
                    <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                      <div className="text-4xl mb-4">⚠️</div>
                      <p className="text-gray-700 font-semibold mb-2 text-center">PDF file not found</p>
                      <p className="text-gray-600 text-sm mb-4 text-center">Please contact support if this issue persists.</p>
                    </div>
                  )}
                </>
              ) : (
                /* Mobile: Show direct link only - compact */
                <div className="flex flex-col items-center px-4 py-5">
                  {filePath ? (
                    <>
                      <div className="text-4xl mb-3">📄</div>
                      <p className="text-gray-700 font-semibold mb-1 text-center text-sm">Study This Material</p>
                      <p className="text-gray-600 text-xs mb-4 text-center px-2">Open the PDF in a new tab to view and study</p>
                      <a
                        href={filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors min-h-[44px] touch-manipulation text-center shadow-md text-sm"
                      >
                        Open PDF in New Tab
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-3">⚠️</div>
                      <p className="text-gray-700 font-semibold mb-1 text-center text-sm">PDF file not found</p>
                      <p className="text-gray-600 text-xs mb-4 text-center px-2">Please contact support if this issue persists.</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer - Mobile Optimized */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              {(() => {
                // Recalculate status fresh each render to ensure accuracy
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

      {/* Video Player Modal - Mobile Optimized */}
      {showVideoModal && hasVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto"
          onClick={() => setShowVideoModal(false)}
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div 
            className={`bg-white rounded-lg shadow-2xl w-full flex flex-col ${
              isMobile ? 'max-w-full max-h-[90vh]' : 'max-w-4xl max-h-[90vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 flex-1 truncate pr-2">{title} - Video</h3>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  handleVideoWatched();
                }}
                className="text-gray-500 active:text-gray-700 transition-colors p-1 min-w-[36px] min-h-[36px] flex items-center justify-center touch-manipulation"
                aria-label="Close video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Player */}
            <div className="p-3 sm:p-4 bg-black">
              <VideoPlayer
                title={title}
                videoPath={videoPath}
                youtubeVideoId={youtubeVideoId}
                dayNumber={dayNumber}
                pdfIndex={pdfIndex}
                onVideoWatched={handleVideoWatched}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  handleVideoWatched();
                }}
                className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-2.5 rounded-lg transition-colors min-h-[44px] touch-manipulation"
              >
                Close & Continue to PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfPreviewCard;

