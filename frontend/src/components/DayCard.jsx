import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import ResourceCard from './ResourceCard';
import PdfPreviewCard from './PdfPreviewCard';
import { isDayUnlocked, isDayCompleted, getDayStatus, isQuizPassed, canCompleteDay, completeDay } from '../utils/progressManager';
import { getCompletedPdfsForDay, areAllPdfsCompleted } from '../utils/pdfLearningFlow';
import { useNavigate } from 'react-router-dom';

function DayCard({ day, dayData, contentVisibility, isExpanded, onToggle, packageType }) {
  const navigate = useNavigate();
  const [completedPdfs, setCompletedPdfs] = useState(0);
  const [dayStatus, setDayStatus] = useState('locked');
  const [canComplete, setCanComplete] = useState(false);
  
  const dayNumber = day.day;
  const totalPdfs = dayData.pdfNotes ? dayData.pdfNotes.length : 0;
  const isUnlocked = isDayUnlocked(dayNumber);
  const isCompleted = isDayCompleted(dayNumber);
  
  useEffect(() => {
    setDayStatus(getDayStatus(dayNumber));
    setCompletedPdfs(getCompletedPdfsForDay(dayNumber, totalPdfs));
    // Can complete day only if all PDFs are completed AND quiz is passed
    const allPdfsDone = areAllPdfsCompleted(dayNumber, totalPdfs);
    const quizDone = isQuizPassed(dayNumber);
    setCanComplete(allPdfsDone && quizDone);
    
    // Refresh every second to update progress
    const interval = setInterval(() => {
      setCompletedPdfs(getCompletedPdfsForDay(dayNumber, totalPdfs));
      const allPdfsDone = areAllPdfsCompleted(dayNumber, totalPdfs);
      const quizDone = isQuizPassed(dayNumber);
      setCanComplete(allPdfsDone && quizDone);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [dayNumber, totalPdfs]);
  
  const handlePdfViewed = (dayNum, pdfIdx) => {
    // Refresh progress when PDF status changes
    setCompletedPdfs(getCompletedPdfsForDay(dayNum, totalPdfs));
    const allPdfsDone = areAllPdfsCompleted(dayNum, totalPdfs);
    const quizDone = isQuizPassed(dayNum);
    setCanComplete(allPdfsDone && quizDone);
  };
  
  const handleStartQuiz = () => {
    navigate(`/quiz/${dayNumber}`);
  };
  
  const handleCompleteDay = () => {
    if (canComplete) {
      completeDay(dayNumber);
      setDayStatus('completed');
      alert(`🎉 Congratulations! Day ${dayNumber} completed! Day ${dayNumber + 1} is now unlocked.`);
      window.location.reload(); // Refresh to show updated status
    }
  };
  
  if (!dayData) return null;

  // Don't render if day is locked and not completed
  if (!isUnlocked && !isCompleted) {
    return (
      <div className="mb-4 animate-slide-up opacity-60">
        <div className="glass-card overflow-hidden border-2 border-gray-300">
          <div className="w-full p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-gray-500">{day.day}</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-500 mb-0.5 sm:mb-1">
                  {day.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                  🔒 Complete Day {dayNumber - 1} to unlock
                </p>
              </div>
            </div>
            <div className="text-2xl flex-shrink-0 ml-2">🔒</div>
          </div>
        </div>
      </div>
    );
  }

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
              {!isCompleted && (
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {completedPdfs}/{totalPdfs} PDFs completed
                </p>
              )}
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
                      dayNumber={dayNumber}
                      pdfIndex={index}
                      onPdfViewed={handlePdfViewed}
                    />
                  ))}
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-4 bg-white rounded-lg p-3 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Completion Progress</span>
                    <span className="text-sm font-bold text-emerald-600">{completedPdfs}/{totalPdfs}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalPdfs > 0 ? (completedPdfs / totalPdfs) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Each material requires: Study → Flashcards (20) → Exam (15 questions, 70%+ to pass)
                  </p>
                </div>
                
                {/* Quiz Section */}
                {areAllPdfsCompleted(dayNumber, totalPdfs) && !isQuizPassed(dayNumber) && (
                  <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">📝</span>
                      Ready for Quiz!
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                      You've completed all materials. Now test your knowledge with the quiz.
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="w-full bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
                
                {/* Complete Day Button */}
                {canComplete && !isCompleted && (
                  <div className="mt-4 bg-green-50 rounded-lg p-4 border-2 border-green-300">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center">
                      <span className="mr-2">🎉</span>
                      Ready to Complete Day {dayNumber}!
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
                      You've studied all materials and passed the quiz. Complete this day to unlock Day {dayNumber + 1}.
                    </p>
                    <button
                      onClick={handleCompleteDay}
                      className="w-full bg-green-600 active:bg-green-700 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg transition-colors min-h-[48px] touch-manipulation shadow-lg"
                    >
                      Complete Day {dayNumber} ✓
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Videos - Elite packages and above */}
            {contentVisibility.videos && dayData.videos && dayData.videos.length > 0 && (
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🎥</span>
                  Embedded Videos
                </h4>
                <div className="space-y-3">
                  {dayData.videos.map((video, index) => (
                    <VideoCard
                      key={index}
                      video={video}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quiz - Elite packages and above */}
            {contentVisibility.quiz && dayData.quiz && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">❓</span>
                  Quiz
                </h4>
                <div className="bg-white rounded p-3 border border-amber-100">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {dayData.quiz.title}
                  </p>
                  <p className="text-xs text-gray-600 font-medium mb-2">
                    {dayData.quiz.description}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mb-3">
                    {dayData.quiz.questions} questions
                  </p>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
                    Start Quiz
                  </button>
                </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default DayCard;
