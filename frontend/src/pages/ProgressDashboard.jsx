import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';

function ProgressDashboard() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const days = [];
    let totalCompleted = 0;
    let totalDays = 7;

    for (let day = 1; day <= 7; day++) {
      const lessonCompleted = localStorage.getItem(`lesson-${day}-completed`) === 'true';
      const lessonUnlocked = day === 1 || localStorage.getItem(`lesson-${day}-unlocked`) === 'true';
      const quizScore = localStorage.getItem(`quiz-${day}-score`);
      
      let status = 'locked';
      if (lessonCompleted) {
        status = 'completed';
        totalCompleted++;
      } else if (lessonUnlocked) {
        status = 'in-progress';
      }

      days.push({
        day,
        status,
        unlocked: lessonUnlocked,
        completed: lessonCompleted,
        quizScore: quizScore ? quizScore.split('/') : null
      });
    }

    setProgressData(days);
    setOverallProgress((totalCompleted / totalDays) * 100);
  };

  const handleDayClick = (dayData) => {
    if (dayData.unlocked) {
      navigate(`/lesson/${dayData.day}`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <span className="text-2xl">✅</span>;
      case 'in-progress':
        return <span className="text-2xl">⏳</span>;
      case 'locked':
        return <span className="text-2xl">🔒</span>;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'locked':
        return 'Locked';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'locked':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const lessonTopics = {
    1: 'Highway Code Fundamentals',
    2: 'Road Signs and Markings',
    3: 'Vehicle Safety and Maintenance',
    4: 'Hazard Perception Training',
    5: 'Traffic Rules and Regulations',
    6: 'Mock Test Practice',
    7: 'Final Review and Exam Prep'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Your Progress
          </h1>
        </div>

        {/* Overall Progress Card */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Course Completion</h2>
              <span className="text-2xl font-bold text-primary-600">
                {Math.round(overallProgress)}%
              </span>
            </div>
            
            {/* Horizontal Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${overallProgress}%` }}
              >
                {overallProgress > 15 && (
                  <span className="text-xs font-bold text-white">
                    {Math.round(overallProgress)}%
                  </span>
                )}
              </div>
            </div>

            {/* Circular Progress (Alternative view) */}
            <div className="flex justify-center mt-6">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                    className="text-primary-600 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {progressData.filter(d => d.completed).length}/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-4 mb-6">
          {progressData.map((dayData) => (
            <button
              key={dayData.day}
              onClick={() => handleDayClick(dayData)}
              disabled={!dayData.unlocked}
              className={`w-full glass-card p-5 text-left transition-all duration-300 ${
                dayData.unlocked
                  ? 'hover:bg-white/20 hover:shadow-xl cursor-pointer transform hover:scale-[1.02]'
                  : 'opacity-75 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {getStatusIcon(dayData.status)}
                  </div>

                  {/* Day Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        Day {dayData.day}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(dayData.status)}`}>
                        {getStatusText(dayData.status)}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 font-medium truncate">
                      {lessonTopics[dayData.day]}
                    </p>
                  </div>
                </div>

                {/* Quiz Score */}
                {dayData.quizScore && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-primary-600">
                        {dayData.quizScore[0]}/{dayData.quizScore[1]}
                      </div>
                      <div className="text-xs text-gray-500">Quiz</div>
                    </div>
                  </div>
                )}

                {/* Arrow Icon */}
                {dayData.unlocked && (
                  <div className="flex-shrink-0 ml-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">
              {progressData.filter(d => d.completed).length}
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1">Completed</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {progressData.filter(d => d.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1">In Progress</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {progressData.filter(d => d.quizScore).length}
            </div>
            <div className="text-xs text-gray-600 font-medium mt-1">Quizzes Done</div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}

export default ProgressDashboard;

