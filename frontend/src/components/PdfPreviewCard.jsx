import React, { useState, useEffect, useRef } from 'react';
import { markPdfOpened, isPdfOpened, isVideoWatched, markVideoWatched } from '../utils/pdfLearningFlow';
import VideoPlayer from './VideoPlayer';

function PdfPreviewCard({ title, description, fileSize, filePath, downloadPath, videoPath, youtubeVideoId, dayNumber, pdfIndex, onPdfViewed, isMultiLanguage = false }) {
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
    
    // Set timeout to stop loading after 30 seconds (longer for mobile PDF loading)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsLoading(prev => {
        if (prev) {
          // Only set error if still loading after 30 seconds
          setLoadError(true);
          return false;
        }
        return prev;
      });
    }, 30000);
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
    
    // PDF loaded successfully - let the browser's PDF viewer handle everything
    console.log('PDF loaded successfully:', filePath);
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
  // All materials are now open - no locking system
  const hasVideo = videoPath || youtubeVideoId;
  const videoWatched = hasVideo ? isVideoWatched(dayNumber, pdfIndex) : true; // If no video, consider it "watched"
  
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
        className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm transition-all duration-300 select-none hover:shadow-md"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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

        {/* Action Buttons - Video and PDF side by side */}
        <div className="mt-4">
          {hasVideo ? (
            <div className="w-full flex gap-2">
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
            </div>
          ) : (
            <button
              onClick={handlePreview}
              className="w-full bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-4 py-3 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-1 min-h-[44px] sm:min-h-[48px] touch-manipulation shadow-md"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline text-xs sm:text-sm">PDF</span>
              <span className="sm:hidden">📄</span>
            </button>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - Mobile Optimized */}
      {showPreview && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in overflow-y-auto ${
            isMultiLanguage ? 'p-0' : 'p-3 sm:p-4'
          }`}
          onClick={handleClosePreview}
          style={{ 
            paddingTop: isMultiLanguage ? '0' : 'env(safe-area-inset-top)', 
            paddingBottom: isMultiLanguage ? '0' : 'env(safe-area-inset-bottom)',
            backgroundColor: 'rgba(0, 0, 0, 0.85)'
          }}
        >
          <div 
            className={`bg-white rounded-lg shadow-2xl w-full flex flex-col select-none border-4 border-gray-300 ${
              isMultiLanguage 
                ? (isMobile ? 'max-w-full max-h-[100vh] m-0' : 'max-w-6xl max-h-[100vh]')
                : (isMobile ? 'max-w-full max-h-[95vh] m-2' : 'max-w-4xl max-h-[95vh]')
            }`}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ 
              userSelect: 'none', 
              WebkitUserSelect: 'none',
              height: isMultiLanguage ? (isMobile ? '100vh' : '100vh') : (isMobile ? '95vh' : '95vh'),
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)'
            }}
          >
            {/* Modal Header - Mobile Optimized */}
            <div className={`flex items-center justify-between px-4 sm:px-6 border-b-2 border-gray-300 bg-gray-50 flex-shrink-0 ${
              isMultiLanguage ? 'py-1.5 sm:py-1.5' : 'py-3 sm:py-4'
            }`}>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 flex-1 truncate pr-2">{title}</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-700 active:text-gray-900 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg hover:bg-gray-200 active:bg-gray-300 bg-white border border-gray-300"
                aria-label="Close preview"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer - REBUILT: Scrollable container with iframe that shows ALL pages */}
            {/* Container scrolls, iframe is very tall so all PDF pages are accessible */}
            <div 
              className="bg-white select-none flex-1 overflow-auto"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{ 
                userSelect: 'none', 
                WebkitUserSelect: 'none',
                height: isMultiLanguage ? 'calc(100vh - 70px)' : 'calc(95vh - 160px)',
                minHeight: isMultiLanguage ? '800px' : '400px',
                backgroundColor: '#ffffff',
                position: 'relative',
                WebkitOverflowScrolling: 'touch',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              {isLoading && !loadError && (
                <div className="flex flex-col items-center justify-center h-64 sm:h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                  <p className="ml-4 text-gray-600 font-medium mt-4">Loading PDF...</p>
                </div>
              )}
              {loadError && !filePath && (
                <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="text-gray-700 font-semibold mb-2 text-center">PDF file not found</p>
                  <p className="text-gray-600 text-sm mb-4 text-center">Please contact support if this issue persists.</p>
                </div>
              )}
              {loadError && filePath && (
                <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-gray-700 font-semibold mb-2 text-center">PDF couldn't load in viewer</p>
                  <p className="text-gray-600 text-sm mb-4 text-center">Please try refreshing the page</p>
                </div>
              )}
              {!loadError && filePath && (
                <div 
                  className="absolute inset-0 w-full h-full"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                >
                  {/* Mobile: Use Google Docs Viewer (shows all pages) */}
                  {/* Desktop: Use direct PDF iframe */}
                  {isMobile ? (
                    <iframe
                      ref={iframeRef}
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + (filePath.startsWith('/') ? filePath : '/' + filePath))}&embedded=true`}
                      className="w-full h-full border-2 border-gray-300 bg-white"
                      title={title}
                      onLoad={handleIframeLoad}
                      onError={(e) => {
                        console.error('Google Docs Viewer failed, trying direct PDF:', filePath);
                        // Fallback to direct PDF if Google Docs Viewer fails
                        const iframe = iframeRef.current;
                        if (iframe) {
                          iframe.src = `${filePath.startsWith('/') ? filePath : '/' + filePath}`;
                          iframe.onerror = handleIframeError;
                        } else {
                          handleIframeError();
                        }
                      }}
                      style={{ 
                        display: isLoading ? 'none' : 'block',
                        width: '100%',
                        height: '100%',
                        border: '2px solid #d1d5db',
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      }}
                      allow="fullscreen"
                    />
                  ) : (
                    <iframe
                      ref={iframeRef}
                      src={`${filePath.startsWith('/') ? filePath : '/' + filePath}`}
                      className="w-full h-full border-2 border-gray-300 bg-white"
                      title={title}
                      onLoad={handleIframeLoad}
                      onError={(e) => {
                        console.error('PDF load error:', e, 'File path:', filePath);
                        handleIframeError();
                      }}
                      style={{ 
                        display: isLoading ? 'none' : 'block',
                        width: '100%',
                        height: '100%',
                        border: '2px solid #d1d5db',
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      }}
                      allow="fullscreen"
                    />
                  )}
                </div>
              )}
              {!filePath && !loadError && (
                <div className="flex flex-col items-center justify-center h-64 sm:h-96 p-4">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="text-gray-700 font-semibold mb-2 text-center">PDF file not found</p>
                  <p className="text-gray-600 text-sm mb-4 text-center">Please contact support if this issue persists.</p>
                </div>
              )}
            </div>

            {/* Modal Footer - Mobile Optimized */}
            <div className="p-4 sm:p-5 border-t-2 border-gray-300 bg-gray-50 flex-shrink-0">
              <button
                onClick={handleClosePreview}
                className="bg-emerald-600 active:bg-emerald-700 text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-lg transition-colors min-h-[52px] sm:min-h-[56px] touch-manipulation w-full shadow-lg active:shadow-xl border-2 border-emerald-700"
              >
                Close
              </button>
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

