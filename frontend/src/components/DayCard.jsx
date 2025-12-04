import React from 'react';
import PdfPreviewCard from './PdfPreviewCard';
import { isDayUnlocked, isDayCompleted, isQuizPassed } from '../utils/progressManager';
import { useNavigate } from 'react-router-dom';

function DayCard({ day, dayData, contentVisibility, isExpanded, onToggle, packageType }) {
  const navigate = useNavigate();
  
  const dayNumber = day.day;
  const isUnlocked = isDayUnlocked(dayNumber);
  const isCompleted = isDayCompleted(dayNumber);
  
  const handlePdfViewed = (dayNum, pdfIdx) => {
    // PDF viewed callback (can be used for future features if needed)
  };
  
  const handleStartQuiz = () => {
    navigate(`/quiz/${dayNumber}`);
  };
  
  if (!dayData) return null;

  // All days are now accessible - no locking mechanism

  return (
    <div className="mb-4 animate-slide-up">
      <div className={`glass-card overflow-hidden ${isCompleted ? 'border-2 border-green-400' : ''}`}>
        {/* Day Header - Always Visible - Mobile Optimized */}
        <button
          onClick={onToggle}
          className="w-full p-4 sm:p-5 flex items-center justify-between active:bg-white/10 hover:bg-white/10 transition-colors touch-manipulation min-h-[60px] sm:min-h-[auto]"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-100' : 'bg-primary-100'}`}>
              {isCompleted ? (
                <span className="text-lg sm:text-xl">✅</span>
              ) : (
                <span className="text-lg sm:text-xl font-bold text-primary-700">{day.day}</span>
              )}
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                  {day.label}
                </h3>
                {isCompleted && <span className="text-green-600 text-sm">✓ Completed</span>}
              </div>
            </div>
          </div>
          <svg
            className={`w-6 h-6 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible Content - Mobile Optimized */}
        {isExpanded && (
          <div className="px-3 sm:px-5 pb-4 sm:pb-5 space-y-3 sm:space-y-4 animate-fade-in">
            {/* Study Materials - Available for all packages */}
            {contentVisibility.pdfNotes && dayData.pdfNotes && dayData.pdfNotes.length > 0 && (
              <div className="bg-emerald-50 rounded-lg p-3 sm:p-4 border border-emerald-200">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2 text-base sm:text-lg">📚</span>
                  Study Materials
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {dayData.pdfNotes.map((pdf, index) => (
                    <PdfPreviewCard
                      key={index}
                      title={pdf.title}
                      description={pdf.description}
                      fileSize={pdf.fileSize}
                      filePath={pdf.filePath || pdf.path}
                      downloadPath={pdf.downloadPath || pdf.filePath || pdf.path}
                      videoPath={pdf.videoPath}
                      youtubeVideoId={pdf.youtubeVideoId}
                      dayNumber={dayNumber}
                      pdfIndex={index}
                      onPdfViewed={handlePdfViewed}
                      isMultiLanguage={false}
                    />
                  ))}
                </div>
                
                
                {/* Day Completed Message */}
                {isCompleted && (
                  <div className="mt-4 bg-green-50 rounded-lg p-4 border-2 border-green-300">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🎉</span>
                      Day {dayNumber} Completed!
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      You passed the exam! Day {dayNumber} is now marked as completed.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Live Support - Elite Live Support and Full Package */}
            {contentVisibility.liveSupport && dayData.liveSupport && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">💬</span>
                  Live Support
                </h4>
                <div className="bg-white rounded p-3 border border-green-100">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {dayData.liveSupport.title}
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-3">
                    {dayData.liveSupport.description}
                  </p>
                  {dayData.liveSupport.available ? (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
                      Book Session
                    </button>
                  ) : (
                    <p className="text-xs text-gray-500 font-medium text-center py-2">
                      Upload coming soon
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Driving Lessons - Only Full Package */}
            {contentVisibility.drivingLessons && (
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🚗</span>
                  Driving Lessons
                </h4>
                <div className="bg-white rounded p-3 border border-red-100">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    Practical Driving Lessons
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-3">
                    Book your in-person driving lessons
                  </p>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
                    Book Lesson
                  </button>
                </div>
              </div>
            )}
            
            {/* End-of-Day Exam Section - At Bottom of Each Day */}
            {!isQuizPassed(dayNumber) && isUnlocked && (
              <div className="mt-4 bg-amber-50 rounded-lg p-4 border-2 border-amber-300">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">📝</span>
                  End-of-Day Exam Required
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                  Complete the exam with 70% or higher to mark this day as completed. All materials are available for study.
                </p>
                <button
                  onClick={handleStartQuiz}
                  className="w-full bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation shadow-lg"
                >
                  Take Day {dayNumber} Exam
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DayCard;
