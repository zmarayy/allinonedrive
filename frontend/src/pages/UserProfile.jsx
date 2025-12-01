import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCodeAccess, getStoredCode, getStoredPackage } from '../utils/codeAccess';
import { getPackageDisplayName } from '../utils/packageAccess';
import { getOverallProgress, getCompletedDaysCount, isDayCompleted, getDayStatus, isQuizPassed } from '../utils/progressManager';
import { isPdfOpened } from '../utils/pdfLearningFlow';
import { DAY_CONTENT } from '../data/courseContent';
import BottomNavbar from '../components/BottomNavbar';

function UserProfile() {
  const navigate = useNavigate();
  const packageType = getStoredPackage();
  const accessCode = getStoredCode();
  const [stats, setStats] = useState({
    completedDays: 0,
    overallProgress: 0,
    totalMaterials: 0,
    completedMaterials: 0,
    totalExams: 0,
    passedExams: 0,
    totalFlashcards: 0,
    studiedFlashcards: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const completedDays = getCompletedDaysCount();
      const overallProgress = getOverallProgress();
      
      // Calculate materials and exams stats
      // NEW SYSTEM: All materials are open, progress is based on exams passed
      let totalMaterials = 0;
      let completedMaterials = 0; // Count viewed materials (optional tracking)
      let totalExams = 7; // One exam per day
      let passedExams = 0;
      
      for (let day = 1; day <= 7; day++) {
        const dayData = DAY_CONTENT[day];
        if (dayData && dayData.pdfNotes) {
          const dayPdfs = dayData.pdfNotes.length;
          totalMaterials += dayPdfs;
          // Count opened PDFs (optional viewing progress - all are available)
          let openedCount = 0;
          for (let i = 0; i < dayPdfs; i++) {
            if (isPdfOpened(day, i)) {
              openedCount++;
            }
          }
          completedMaterials += openedCount;
          // Count passed exams
          if (isQuizPassed(day)) {
            passedExams += 1;
          }
        }
      }
      
      setStats({
        completedDays,
        overallProgress,
        totalMaterials,
        completedMaterials,
        totalExams,
        passedExams,
        totalFlashcards: totalMaterials * 20, // 20 flashcards per material
        studiedFlashcards: completedMaterials * 20 // Approximate
      });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clearCodeAccess();
      navigate('/access-code');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Your Profile
          </h1>
          {packageType && (
            <p className="text-sm text-gray-600 text-center font-medium">
              {getPackageDisplayName(packageType)}
            </p>
          )}
        </div>

        {/* Overall Progress Card */}
        <div className="mb-6 animate-slide-up">
          <div className="glass-card p-5 sm:p-6 border-2 border-primary-200">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 mb-3">
                <span className="text-3xl sm:text-4xl">📊</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Course Progress
              </h2>
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-3">
                {stats.overallProgress}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.overallProgress}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center font-medium">
              {stats.completedDays} of 7 days completed
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl mb-2">📚</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">
              {stats.totalMaterials}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Materials Available
            </div>
          </div>
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl mb-2">✅</div>
            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
              {stats.passedExams}/{stats.totalExams}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Exams Passed
            </div>
          </div>
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl mb-2">🎴</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1">
              {stats.studiedFlashcards}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Flashcards
            </div>
          </div>
          <div className="glass-card p-4 sm:p-5 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl mb-2">🎯</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-1">
              {stats.completedDays}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Days Done
            </div>
          </div>
        </div>

        {/* Day-by-Day Progress */}
        <div className="mb-6 animate-slide-up">
          <div className="glass-card p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2 text-xl">📅</span>
              Your Progress
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isCompleted = isDayCompleted(day);
                const status = getDayStatus(day);
                const examPassed = isQuizPassed(day);
                const dayData = DAY_CONTENT[day];
                const totalPdfs = dayData?.pdfNotes?.length || 0;
                
                return (
                  <div
                    key={day}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-300'
                        : status === 'in-progress'
                        ? 'bg-primary-50 border-primary-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-green-100'
                            : status === 'in-progress'
                            ? 'bg-primary-100'
                            : 'bg-gray-200'
                        }`}>
                          {isCompleted ? (
                            <span className="text-lg sm:text-xl">✅</span>
                          ) : status === 'in-progress' ? (
                            <span className="text-sm sm:text-base font-bold text-primary-700">{day}</span>
                          ) : (
                            <span className="text-sm sm:text-base font-bold text-gray-500">🔒</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm sm:text-base ${
                            isCompleted ? 'text-green-800' : status === 'in-progress' ? 'text-primary-800' : 'text-gray-500'
                          }`}>
                            Day {day}
                          </p>
                          {status === 'in-progress' && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              {examPassed ? '✅ Exam Passed' : '📝 Exam Available'}
                            </p>
                          )}
                          {isCompleted && (
                            <p className="text-xs sm:text-sm text-green-700 font-medium">
                              ✅ Exam Passed - Day Complete
                            </p>
                          )}
                        </div>
                      </div>
                      {status === 'in-progress' && (
                        <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              examPassed ? 'bg-green-600' : 'bg-amber-500'
                            }`}
                            style={{ width: examPassed ? '100%' : '0%' }}
                          ></div>
                        </div>
                      )}
                      {isCompleted && (
                        <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Package Info & Logout */}
        <div className="mb-6 animate-slide-up">
          <div className="glass-card p-5 sm:p-6">
            {packageType && (
              <div className="mb-4 p-3 sm:p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Your Package:</p>
                <p className="font-bold text-primary-700 text-base sm:text-lg">
                  {getPackageDisplayName(packageType)}
                </p>
                {accessCode && (
                  <p className="text-xs text-gray-500 mt-1">
                    Access Code: {accessCode}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 active:bg-red-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 shadow-md active:shadow-lg transform active:scale-95 min-h-[48px] touch-manipulation"
            >
              Logout & Clear Access Code
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}

export default UserProfile;

