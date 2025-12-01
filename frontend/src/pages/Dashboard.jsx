import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPackage, getPackageDisplayName } from '../utils/packageAccess';
import { clearCodeAccess } from '../utils/codeAccess';
import { getOverallProgress, getCompletedDaysCount, getDayStatus, isDayCompleted, isQuizPassed, resetProgress } from '../utils/progressManager';
import { resetPdfProgress } from '../utils/pdfLearningFlow';
import { DAY_CONTENT } from '../data/courseContent';
import BottomNavbar from '../components/BottomNavbar';

function Dashboard() {
  const navigate = useNavigate();
  const packageType = getUserPackage();
  const packageDisplayName = getPackageDisplayName(packageType);
  const [completedDays, setCompletedDays] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);

  // Load progress and find current day
  useEffect(() => {
    const updateProgress = () => {
      setCompletedDays(getCompletedDaysCount());
      setOverallProgress(getOverallProgress());
      
      // Find the current active day (first unlocked but not completed)
      let activeDay = 1;
      for (let day = 1; day <= 7; day++) {
        const status = getDayStatus(day);
        if (status === 'in-progress' || (status === 'locked' && day === 1)) {
          activeDay = day;
          break;
        }
        if (status === 'completed' && day < 7) {
          activeDay = day + 1;
        }
      }
      setCurrentDay(activeDay);
    };
    
    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clearCodeAccess();
      navigate('/access-code');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This will clear all your learning data and cannot be undone.')) {
      resetProgress();
      resetPdfProgress();
      // Force reload to update UI
      window.location.reload();
    }
  };

  // Get current day info
  const currentDayData = DAY_CONTENT[currentDay];
  const quizPassed = isQuizPassed(currentDay);
  const isCompleted = isDayCompleted(currentDay);

  // Determine what action to show
  const getActionButton = () => {
    if (isCompleted) {
      if (currentDay < 7) {
        return {
          text: `Start Day ${currentDay + 1}`,
          subtitle: `Continue to the next day`,
          color: 'bg-primary-600 active:bg-primary-700',
          onClick: () => navigate('/course-content')
        };
      } else {
        return {
          text: '🎉 Course Complete!',
          subtitle: 'You\'ve finished all 7 days!',
          color: 'bg-green-600 active:bg-green-700',
          onClick: () => navigate('/course-content')
        };
      }
    } else if (quizPassed) {
      return {
        text: `Day ${currentDay} Completed`,
        subtitle: 'You passed the exam! Next day is unlocked.',
        color: 'bg-green-600 active:bg-green-700',
        onClick: () => navigate('/course-content')
      };
    } else {
      return {
        text: `Take Day ${currentDay} Exam`,
        subtitle: 'Take the end-of-day exam to unlock next day (70%+ required)',
        color: 'bg-amber-600 active:bg-amber-700',
        onClick: () => navigate(`/quiz/${currentDay}`)
      };
    }
  };

  const actionButton = getActionButton();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
        {/* Header with Logo */}
        <div className="mb-6 animate-fade-in">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/assets/images/allinonedrive.png"
              alt="All In One Drive Logo"
              className="h-16 sm:h-20 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                My Learning
              </h1>
              {packageType && (
                <p className="text-sm text-gray-600 font-medium">
                  {packageDisplayName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Reset button - only show in development */}
              {(process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') && (
                <button
                  onClick={handleResetProgress}
                  className="px-3 py-2 bg-yellow-50 active:bg-yellow-100 text-yellow-700 font-semibold rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
                  title="Reset all progress (Dev only)"
                >
                  Reset
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-50 active:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div className="mb-6 animate-slide-up">
          <div className="glass-card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm sm:text-base font-semibold text-gray-700">Course Progress</span>
              <span className="text-sm sm:text-base font-bold text-primary-600">{completedDays}/7 Days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">{overallProgress}% Complete</p>
          </div>
        </div>

        {/* Main Action Card - Current Day Focus */}
        <div className="mb-6 animate-slide-up">
          <div className={`glass-card p-5 sm:p-6 border-2 ${
            isCompleted ? 'border-green-400' : 
            quizPassed ? 'border-green-300' : 
            'border-primary-200'
          }`}>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 mb-3">
                {isCompleted ? (
                  <span className="text-3xl sm:text-4xl">✅</span>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-primary-700">Day {currentDay}</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {isCompleted && currentDay === 7 
                  ? '🎉 Course Complete!' 
                  : isCompleted 
                  ? `Day ${currentDay} Complete!` 
                  : 'Continue Your Learning'}
              </h2>
              {!isCompleted && (
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  {quizPassed 
                    ? 'Exam passed! Day completed.' 
                    : 'All materials are unlocked. Study at your own pace, then take the end-of-day exam.'}
                </p>
              )}
            </div>

            {/* Main Action Button */}
            <button
              onClick={actionButton.onClick}
              className={`w-full ${actionButton.color} text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-6 rounded-xl transition-all duration-300 shadow-lg active:shadow-xl transform active:scale-95 min-h-[56px] touch-manipulation`}
            >
              {actionButton.text}
            </button>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2 font-medium">
              {actionButton.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
              {completedDays}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Days Completed
            </div>
          </div>
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
              {7 - completedDays}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Days Remaining
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <button
            onClick={() => navigate('/course-content')}
            className="glass-card p-4 sm:p-5 text-left hover:shadow-lg transition-all active:scale-95 touch-manipulation"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl">📖</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">
                  Course Content
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">
                  View all 7 days
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button
            onClick={() => navigate('/flashcards')}
            className="glass-card p-4 sm:p-5 text-left hover:shadow-lg transition-all active:scale-95 touch-manipulation"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl">🎴</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">
                  Flashcards
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">
                  Practice anytime
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Motivational Message */}
        {completedDays > 0 && completedDays < 7 && (
          <div className="mb-6 animate-fade-in">
            <div className="glass-card p-4 sm:p-5 bg-gradient-to-r from-primary-50 to-emerald-50 border border-primary-200">
              <div className="flex items-start space-x-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">💪</div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    Keep Going!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    You're making great progress. {completedDays === 1 ? 'One day down' : `${completedDays} days completed`}, {7 - completedDays} more to go!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Overview */}
        <div className="mb-6 animate-fade-in">
          <div className="glass-card p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2 text-lg">📋</span>
              Course Overview
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600 font-medium">Total Days</span>
                <span className="font-bold text-gray-900">7 Days</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600 font-medium">Your Progress</span>
                <span className="font-bold text-primary-600">{Math.round(overallProgress)}%</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600 font-medium">Learning Path</span>
                <span className="font-bold text-emerald-600">Study → Exam</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;

