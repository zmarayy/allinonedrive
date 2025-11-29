import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_EXAMS } from '../data/pdfContent';
import { savePdfExamScore, areFlashcardsCompleted, isPdfOpened } from '../utils/pdfLearningFlow';
import BottomNavbar from '../components/BottomNavbar';

// Helper function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to randomize question options
const randomizeQuestion = (question) => {
  if (!question || !question.options) return question;
  
  // Create array of indices [0, 1, 2, 3]
  const indices = question.options.map((_, index) => index);
  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);
  
  // Find where the correct answer moved to
  const originalCorrectIndex = question.correctAnswer;
  const newCorrectIndex = shuffledIndices.indexOf(originalCorrectIndex);
  
  // Create new options array with shuffled order
  const shuffledOptions = shuffledIndices.map(idx => question.options[idx]);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
    originalCorrectAnswer: originalCorrectIndex // Keep original for reference if needed
  };
};

function PdfExam() {
  const { day, pdfIndex } = useParams();
  const navigate = useNavigate();
  const dayNumber = parseInt(day);
  const pdfIdx = parseInt(pdfIndex);
  
  const rawExamQuestions = PDF_EXAMS[dayNumber]?.[pdfIdx] || [];
  
  // Randomize each question's options when component loads or when day/pdf changes
  const [examQuestions, setExamQuestions] = useState(() => {
    if (rawExamQuestions.length === 0) return [];
    return rawExamQuestions.map(q => randomizeQuestion(q));
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isExamComplete, setIsExamComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  // Check if user can take exam (must have studied PDF and completed flashcards, video is optional)
  const canTakeExam = isPdfOpened(dayNumber, pdfIdx) && areFlashcardsCompleted(dayNumber, pdfIdx);

  const currentQuestion = examQuestions[currentQuestionIndex];
  const totalQuestions = examQuestions.length;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  useEffect(() => {
    // Reset when day/pdf changes and randomize questions
    const questions = PDF_EXAMS[dayNumber]?.[pdfIdx] || [];
    if (questions.length > 0) {
      const newQuestions = questions.map(q => randomizeQuestion(q));
      setExamQuestions(newQuestions);
    } else {
      setExamQuestions([]);
    }
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsExamComplete(false);
    setScore(0);
  }, [day, pdfIndex, dayNumber, pdfIdx]);

  // Redirect if can't take exam
  useEffect(() => {
    if (!canTakeExam && dayNumber && pdfIdx !== undefined) {
      // Don't show alert on initial load, just redirect
      navigate('/course-content');
    }
  }, [canTakeExam, dayNumber, pdfIdx, navigate]);

  const handleAnswerSelect = (optionIndex) => {
    if (showResult || isExamComplete) return;
    
    setSelectedAnswer(optionIndex);
    setShowResult(true);

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
      // Exam complete - calculate score
      const correctAnswers = answers.filter(a => a.correct).length;
      const finalScore = correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      setScore(finalScore);
      setIsExamComplete(true);
      
      // Save score
      savePdfExamScore(dayNumber, pdfIdx, finalScore, totalQuestions);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsExamComplete(false);
    setScore(0);
  };

  if (isExamComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {passed ? '🎉 Exam Passed!' : 'Exam Complete'}
            </h1>
            <div className="text-4xl sm:text-5xl mb-4">{passed ? '✅' : '📝'}</div>
          </div>

          <div className={`glass-card p-6 sm:p-8 mb-6 ${passed ? 'border-2 border-green-400' : 'border-2 border-amber-400'}`}>
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-amber-600'}`}>
                {score}/{totalQuestions}
              </div>
              <div className="text-lg sm:text-xl text-gray-600 font-medium mb-4">
                {percentage}% Correct
              </div>
              
              {passed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-semibold text-sm sm:text-base">
                    ✅ Great job! You passed with {percentage}%. You can now move to the next material.
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-800 font-semibold text-sm sm:text-base">
                    You need 70% to pass. You got {percentage}%. Review the material and flashcards, then try again!
                  </p>
                </div>
              )}

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
                    className="w-full bg-green-600 active:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all min-h-[56px] touch-manipulation"
                  >
                    Continue to Next Material
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="w-full bg-amber-600 active:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all min-h-[56px] touch-manipulation"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => navigate('/course-content')}
                  className="w-full glass-button py-4 px-6 text-base sm:text-lg font-semibold text-gray-900 min-h-[56px] touch-manipulation"
                >
                  Back to Course Content
                </button>
              </div>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (examQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Exam Available</h2>
            <button
              onClick={() => navigate('/course-content')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back to Course
            </button>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!canTakeExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Flashcards First!
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              You must study the material and complete all 20 flashcards before taking the exam.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/pdf-flashcards/${dayNumber}/${pdfIdx}`)}
                className="w-full bg-primary-600 active:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg min-h-[48px] touch-manipulation"
              >
                Study Flashcards (20 cards)
              </button>
              <button
                onClick={() => navigate('/course-content')}
                className="w-full bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg min-h-[48px] touch-manipulation"
              >
                Back to Course Content
              </button>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">PDF Exam</h1>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round(progress)}%
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-primary-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-5 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-2 sm:space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showFeedback = showResult;

              let buttonClass = 'w-full text-left py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 min-h-[48px] touch-manipulation ';
              
              if (showFeedback) {
                if (isCorrect) {
                  buttonClass += 'bg-green-100 border-2 border-green-500 text-green-800';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-100 border-2 border-red-500 text-red-800';
                } else {
                  buttonClass += 'bg-gray-100 border border-gray-300 text-gray-600';
                }
              } else {
                buttonClass += isSelected
                  ? 'bg-primary-100 border-2 border-primary-500 text-primary-800'
                  : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={buttonClass + ' active:scale-[0.98]'}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  aria-label={`Answer option ${String.fromCharCode(65 + index)}: ${option}`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {showFeedback && isCorrect && (
                      <span className="ml-auto text-green-600 font-bold">✓</span>
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <span className="ml-auto text-red-600 font-bold">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50' : 'bg-amber-50'
            }`}>
              <p className={`text-sm sm:text-base font-medium ${
                selectedAnswer === currentQuestion.correctAnswer ? 'text-green-800' : 'text-amber-800'
              }`}>
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        {showResult && (
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleNext}
              className="flex-1 bg-primary-600 active:bg-primary-700 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all min-h-[56px] touch-manipulation active:scale-[0.98]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Exam' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default PdfExam;

