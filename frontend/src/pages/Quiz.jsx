import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveQuizScore, isDayUnlocked } from '../utils/progressManager';
import { DAY_CONTENT } from '../data/courseContent';
import BottomNavbar from '../components/BottomNavbar';

// Dummy quiz data - in a real app, this would come from an API
const quizData = {
  1: {
    lessonTitle: 'Day 1: Highway Code Fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is the speed limit in built-up areas?',
        options: ['20mph', '30mph', '40mph', '50mph'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What should you do at a zebra crossing?',
        options: [
          'Speed up to cross quickly',
          'Give way to pedestrians',
          'Honk your horn',
          'Ignore pedestrians'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'On a roundabout, which traffic should you give way to?',
        options: [
          'Traffic from the left',
          'Traffic from the right',
          'Traffic behind you',
          'No one'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What does a red traffic light mean?',
        options: [
          'Slow down',
          'Stop',
          'Proceed with caution',
          'Speed up'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'When should you use your hazard lights?',
        options: [
          'When driving in heavy rain',
          'When you\'ve broken down or stopped',
          'When overtaking',
          'When parking'
        ],
        correctAnswer: 1
      }
    ]
  },
  2: {
    lessonTitle: 'Day 2: Road Signs and Markings',
    questions: [
      {
        id: 1,
        question: 'What do circular signs with red borders indicate?',
        options: [
          'Warning signs',
          'Prohibitions or mandatory actions',
          'Information signs',
          'Direction signs'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What do triangular signs warn of?',
        options: [
          'Speed limits',
          'Hazards ahead',
          'Parking restrictions',
          'Route numbers'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What do double yellow lines mean?',
        options: [
          'Parking allowed',
          'No parking at any time',
          'Parking allowed on weekends',
          'Loading only'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What do blue circular signs indicate?',
        options: [
          'Warnings',
          'Mandatory instructions',
          'Information',
          'Prohibitions'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does a solid white line mean?',
        options: [
          'You can cross it',
          'You should not cross it',
          'Overtaking allowed',
          'Parking allowed'
        ],
        correctAnswer: 1
      }
    ]
  },
  3: {
    lessonTitle: 'Day 3: Vehicle Safety and Maintenance',
    questions: [
      {
        id: 1,
        question: 'What is the minimum tire tread depth?',
        options: ['1.0mm', '1.6mm', '2.0mm', '2.5mm'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which lights must be working on your vehicle?',
        options: [
          'Only headlights',
          'Headlights, brake lights, and indicators',
          'Only brake lights',
          'Only indicators'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'How often should you check your brakes?',
        options: [
          'Once a year',
          'Before every journey',
          'Once a month',
          'Only when they fail'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What documents must you keep in your vehicle?',
        options: [
          'Only driving license',
          'MOT, insurance, and license',
          'Only insurance',
          'No documents needed'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What should you do if your tire pressure is low?',
        options: [
          'Ignore it',
          'Inflate to correct pressure',
          'Only check monthly',
          'Replace the tire'
        ],
        correctAnswer: 1
      }
    ]
  },
  4: {
    lessonTitle: 'Day 4: Hazard Awareness and Vulnerable Road Users',
    questions: [
      {
        id: 1,
        question: 'What should you do when approaching a pedestrian crossing?',
        options: [
          'Speed up to cross quickly',
          'Slow down and be prepared to stop',
          'Honk your horn',
          'Ignore pedestrians'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'How should you treat cyclists on the road?',
        options: [
          'Give them plenty of space',
          'Drive close to them',
          'Ignore them',
          'Honk at them'
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'What should you do when you see children near the road?',
        options: [
          'Speed up',
          'Slow down and be extra cautious',
          'Ignore them',
          'Honk your horn'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What should you do when approaching a roundabout?',
        options: [
          'Give way to traffic from the right',
          'Speed up',
          'Ignore other traffic',
          'Drive on the left side'
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'What should you do when you see a horse on the road?',
        options: [
          'Speed up and pass quickly',
          'Slow down and give plenty of space',
          'Honk your horn',
          'Ignore it'
        ],
        correctAnswer: 1
      }
    ]
  },
  5: {
    lessonTitle: 'Day 5: Other Vehicles and Vehicle Handling',
    questions: [
      {
        id: 1,
        question: 'Where should you park at night?',
        options: [
          'Anywhere',
          'In a well-lit area facing traffic',
          'On a blind corner',
          'On a pedestrian crossing'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What should you do when parking on a hill?',
        options: [
          'Leave the car in neutral',
          'Apply the handbrake and leave in gear',
          'Leave the engine running',
          'Park facing downhill only'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the minimum distance you should park from a junction?',
        options: [
          '5 meters',
          '10 meters',
          '15 meters',
          '20 meters'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'When should you use your parking lights?',
        options: [
          'Never',
          'When parking at night on a road with speed limit over 30mph',
          'Always when parking',
          'Only in car parks'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What should you do if your vehicle breaks down on a motorway?',
        options: [
          'Stay in your vehicle',
          'Get out and stand behind the barrier',
          'Walk along the hard shoulder',
          'Try to fix it yourself'
        ],
        correctAnswer: 1
      }
    ]
  },
  6: {
    lessonTitle: 'Day 6: Motorway Rules and Essential Documents',
    questions: [
      {
        id: 1,
        question: 'What is the minimum speed on a motorway?',
        options: [
          'There is no minimum speed',
          '30mph',
          '40mph',
          '50mph'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which lane should you normally use on a motorway?',
        options: [
          'The right lane',
          'The left lane',
          'The middle lane',
          'Any lane'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What documents must you have when driving?',
        options: [
          'Driving license only',
          'Driving license, insurance, and MOT certificate',
          'Insurance only',
          'No documents needed'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What should you do when joining a motorway?',
        options: [
          'Stop and wait',
          'Accelerate to match traffic speed',
          'Slow down',
          'Honk your horn'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does a red X above a motorway lane mean?',
        options: [
          'Lane closed',
          'Speed limit',
          'Overtaking allowed',
          'Parking allowed'
        ],
        correctAnswer: 0
      }
    ]
  },
  7: {
    lessonTitle: 'Day 7: Incidents, Emergencies and Vehicle Loading',
    questions: [
      {
        id: 1,
        question: 'What should you do if you witness a road accident?',
        options: [
          'Drive away quickly',
          'Stop and help if safe to do so',
          'Ignore it',
          'Take photos only'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What should you do if you break down on a motorway?',
        options: [
          'Stay in your vehicle',
          'Get out and stand behind the barrier',
          'Walk along the hard shoulder',
          'Try to fix it yourself'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What should you do at road works?',
        options: [
          'Speed up',
          'Slow down and follow signs',
          'Ignore signs',
          'Drive on the wrong side'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What should you do at a level crossing when lights are flashing?',
        options: [
          'Speed up',
          'Stop and wait',
          'Drive through quickly',
          'Ignore the lights'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the first thing you should do in an emergency?',
        options: [
          'Panic',
          'Ensure your own safety first',
          'Call everyone you know',
          'Take photos'
        ],
        correctAnswer: 1
      }
    ]
  }
};

function Quiz() {
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNumber = parseInt(day) || 1;
  const quiz = quizData[dayNumber] || quizData[1];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  // Quiz is available if day is unlocked (all PDFs are available from start)
  const canTakeQuiz = isDayUnlocked(dayNumber);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  // Redirect if can't take quiz
  useEffect(() => {
    if (!canTakeQuiz && dayNumber) {
      navigate('/course-content');
    }
  }, [canTakeQuiz, dayNumber, navigate]);

  useEffect(() => {
    // Reset when day changes
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsQuizComplete(false);
    setScore(0);
  }, [day]);

  const handleAnswerSelect = (optionIndex) => {
    if (showResult || isQuizComplete) return;
    
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    // Check if answer is correct
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const newAnswers = [...answers, { questionId: currentQuestion.id, selected: optionIndex, correct: isCorrect }];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete - calculate score
      const correctAnswers = answers.filter(a => a.correct).length;
      const finalScore = correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      setScore(finalScore);
      setIsQuizComplete(true);
    }
  };

  const handleBackToCourse = () => {
    navigate('/course-content');
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsQuizComplete(false);
    setScore(0);
  };

  // Save quiz score using progressManager
  useEffect(() => {
    if (isQuizComplete && dayNumber) {
      saveQuizScore(dayNumber, score, totalQuestions);
    }
  }, [isQuizComplete, score, totalQuestions, dayNumber]);

  if (isQuizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70; // Changed from 80% to 70%

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {passed ? '🎉 Quiz Passed!' : 'Quiz Complete'}
              </h1>
              <div className="text-5xl mb-4">{passed ? '✅' : '📝'}</div>
            </div>

            {/* Score Card */}
            <div className={`glass-card p-8 mb-6 animate-slide-up ${passed ? 'border-2 border-green-400' : 'border-2 border-amber-400'}`}>
              <div className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-amber-600'}`}>
                  {score}/{totalQuestions}
                </div>
                <div className="text-xl text-gray-600 font-medium mb-4">
                  {percentage}% Correct
                </div>
                
                {passed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      ✅ Great job! You passed with {percentage}%. Day {dayNumber + 1} is now unlocked!
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-amber-800 font-semibold text-sm sm:text-base">
                      You need 70% to pass and unlock Day {dayNumber + 1}. You got {percentage}%. Review the materials and try again!
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {passed ? (
                    <button
                      onClick={() => {
                        // Small delay to ensure localStorage is updated
                        setTimeout(() => {
                          navigate('/course-content');
                          // Force page refresh to update all progress indicators
                          window.location.reload();
                        }, 100);
                      }}
                      className="w-full bg-green-600 active:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] touch-manipulation"
                    >
                      Continue to Day {dayNumber + 1}
                    </button>
                  ) : (
                    <button
                      onClick={handleRetry}
                      className="w-full bg-amber-600 active:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] touch-manipulation"
                    >
                      Try Again
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/course-content')}
                    className="w-full glass-button py-4 px-6 text-lg font-semibold text-gray-900 min-h-[48px] touch-manipulation"
                  >
                    Back to Course Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
  
  if (!canTakeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Study First!
              </h2>
              <p className="text-gray-600 font-medium mb-6">
                Day {dayNumber} is not unlocked yet. Complete Day {dayNumber - 1} exam (70%+) to unlock this day.
              </p>
              <button
                onClick={() => navigate('/course-content')}
                className="bg-primary-600 active:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg min-h-[48px] touch-manipulation"
              >
                Go to Course Content
              </button>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {quiz.lessonTitle}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <p className="text-sm text-gray-500">
                {Math.round(progress)}%
              </p>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-card p-6 md:p-8 mb-6 animate-slide-up">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showFeedback = showResult;

                let buttonClass = 'w-full text-left py-4 px-6 rounded-lg font-medium transition-all duration-300 ';
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += 'bg-green-100 border-2 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'bg-red-100 border-2 border-red-500 text-red-800';
                  } else {
                    buttonClass += 'bg-gray-100 border-2 border-gray-300 text-gray-600';
                  }
                } else {
                  buttonClass += 'bg-white/50 border-2 border-white/30 text-gray-900 hover:bg-white/70 hover:border-primary-300';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && isCorrect && (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          {showResult && (
            <div className="animate-slide-up">
              <button
                onClick={handleNext}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
              </button>
            </div>
          )}

          {/* Back to Lesson Button */}
          {!showResult && (
            <div className="text-center mt-6">
              <button
                onClick={handleBackToCourse}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Course
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Quiz;

