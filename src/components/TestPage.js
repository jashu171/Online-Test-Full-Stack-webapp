import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, X } from 'lucide-react';
import './TestPage.css';

const TestPage = ({ onTestComplete, onBackToDashboard }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Sample quiz data - Aptitude Questions
  const quizData = {
    title: "Aptitude Test",
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        question: "If a train travels 120 km in 2 hours, what is its speed in km/h?",
        options: [
          "50 km/h",
          "60 km/h",
          "80 km/h",
          "90 km/h"
        ],
        correctAnswer: "60 km/h"
      },
      {
        id: 2,
        question: "What is 15% of 200?",
        options: [
          "25",
          "30",
          "40",
          "45"
        ],
        correctAnswer: "30"
      },
      {
        id: 3,
        question: "If 3x + 7 = 22, what is the value of x?",
        options: [
          "3",
          "4",
          "5",
          "7"
        ],
        correctAnswer: "5"
      },
      {
        id: 4,
        question: "A shop offers 20% discount on a item priced at ₹500. What is the final price?",
        options: [
          "₹380",
          "₹400",
          "₹420",
          "₹480"
        ],
        correctAnswer: "₹400"
      },
      {
        id: 5,
        question: "Which number comes next in the series: 2, 6, 12, 20, 30, ?",
        options: [
          "40",
          "42",
          "44",
          "48"
        ],
        correctAnswer: "42"
      },
      {
        id: 6,
        question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
        options: [
          "8",
          "10",
          "12",
          "14",
        ],
        correctAnswer: "10"
      },
      {
        id: 7,
        question: "What is the area of a rectangle with length 12 cm and width 8 cm?",
        options: [
          "88 cm²",
          "92 cm²",
          "96 cm²",
          "104 cm²"
        ],
        correctAnswer: "96 cm²"
      },
      {
        id: 8,
        question: "If it takes 5 workers 8 hours to complete a job, how long will it take 8 workers to complete the same job?",
        options: [
          "3 hours",
          "4 hours",
          "5 hours",
          "7 hours"
        ],
        correctAnswer: "5 hours"
      },
      {
        id: 9,
        question: "What is the simple interest on ₹1000 at 10% per annum for 2 years?",
        options: [
          "₹150",
          "₹180",
          "₹200",
          "₹250"
        ],
        correctAnswer: "₹200"
      },
      {
        id: 10,
        question: "If a car uses 5 liters of fuel to travel 100 km, how much fuel is needed to travel 350 km?",
        options: [
          "15.5 liters",
          "16.5 liters",
          "17.5 liters",
          "19.5 liters"
        ],
        correctAnswer: "17.5 liters"
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const progress = ((currentQuestion + 1) / quizData.totalQuestions) * 100;

  // Get answered questions count
  const answeredCount = Object.keys(answers).length;

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  // Navigation functions
  const goToNext = () => {
    if (currentQuestion < quizData.totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setSelectedAnswer(answers[index] || '');
  };

  // Handle submit
  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const percentage = ((correctAnswers / quizData.totalQuestions) * 100).toFixed(1);
    setScore(percentage);
    setShowResults(true);

    // Send results back to Dashboard
    if (onTestComplete) {
      onTestComplete({
        score: correctAnswers,
        percentage: percentage,
        correct: correctAnswers,
        wrong: quizData.totalQuestions - correctAnswers,
        totalQuestions: quizData.totalQuestions
      });
    }
  };

  // Calculate correct answers for display
  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  // Get question status
  const getQuestionStatus = (index) => {
    if (answers[index]) return 'answered';
    if (index === currentQuestion) return 'current';
    return 'unanswered';
  };

  const currentQuestionData = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="quiz-title">{quizData.title}</h1>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="header-right">
            <div className="score-display">
              <div className="score-number">{calculateScore()}/{quizData.totalQuestions}</div>
              <div className="score-label">Questions answered</div>
            </div>
            
            <div className="timer-container">
              <Clock className="timer-icon" />
              <span className="timer-text">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <button onClick={onBackToDashboard} className="exit-button" title="Exit Test">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          {/* Main Content */}
          <div className="question-section">
            <div className="question-card">
              {/* Question Header */}
              <div className="question-header">
                <h2 className="question-title">
                  Question {currentQuestion + 1}/{quizData.totalQuestions}: {currentQuestionData.question}
                </h2>
                {currentQuestionData.referenceRange && (
                  <div className="reference-range">
                    <span className="reference-link">
                      {currentQuestionData.referenceRange}
                    </span>
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="options-container">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedAnswer === option ? 'option-selected' : ''}`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="option-content">
                      <div className={`radio-button ${selectedAnswer === option ? 'radio-selected' : ''}`}>
                        {selectedAnswer === option && (
                          <div className="radio-dot" />
                        )}
                      </div>
                      <span className="option-text">{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestion === 0}
                  className="nav-button nav-button-secondary"
                >
                  <ChevronLeft className="nav-icon" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Submit
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentQuestion === quizData.totalQuestions - 1}
                  className="nav-button nav-button-secondary"
                >
                  <span>Next</span>
                  <ChevronRight className="nav-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Question Navigation */}
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Questions</h3>
              
              <div className="question-grid">
                {Array.from({ length: quizData.totalQuestions }, (_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`question-button question-${status}`}
                    >
                      <div className="question-button-content">
                        {status === 'answered' && (
                          <div className="status-indicator status-answered">
                            <div className="status-dot" />
                          </div>
                        )}
                        {status === 'current' && !answers[index] && (
                          <div className="status-indicator status-current">
                            <div className="status-dot-current" />
                          </div>
                        )}
                        Question {index + 1}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Statistics */}
              <div className="statistics">
                <div className="stat-item">
                  <span className="stat-label">Answered:</span>
                  <span className="stat-value stat-answered">{answeredCount}/{quizData.totalQuestions}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Remaining:</span>
                  <span className="stat-value stat-remaining">{quizData.totalQuestions - answeredCount}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Progress:</span>
                  <span className="stat-value stat-progress">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Legend */}
              <div className="legend">
                <div className="legend-title">Legend:</div>
                <div className="legend-item">
                  <div className="legend-color legend-answered"></div>
                  <span className="legend-text">Answered</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-current"></div>
                  <span className="legend-text">Current</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-unanswered"></div>
                  <span className="legend-text">Unanswered</span>
                </div>
              </div>
            </div>

            {/* Timer Warning */}
            {timeRemaining < 300 && (
              <div className="timer-warning">
                <div className="warning-header">
                  <Clock className="warning-icon" />
                  <span className="warning-title">Time Warning!</span>
                </div>
                <p className="warning-text">Less than 5 minutes remaining</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="quiz-footer">
        <div className="footer-content">
          <div className="footer-left">
            <User className="footer-icon" />
            <span>Exam Mode - Auto-save enabled</span>
          </div>
          
          <div className="footer-right">
            Question {currentQuestion + 1} of {quizData.totalQuestions}
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="modal-overlay">
          <div className="results-modal">
            <div className="results-content">
              <div className="results-header">
                <div className="score-circle">
                  <div className="score-percentage">{score}%</div>
                </div>
                <h2 className="results-title">Test Completed!</h2>
                <p className="results-subtitle">Here are your results:</p>
              </div>
              
              <div className="results-stats">
                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-number stat-correct">{calculateScore()}</div>
                    <div className="stat-description">Correct Answers</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number stat-wrong">{quizData.totalQuestions - calculateScore()}</div>
                    <div className="stat-description">Wrong Answers</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number stat-attempted">{answeredCount}</div>
                    <div className="stat-description">Total Attempted</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number stat-not-attempted">{quizData.totalQuestions - answeredCount}</div>
                    <div className="stat-description">Not Attempted</div>
                  </div>
                </div>
                
                <div className="final-score">
                  <span className="final-score-label">Final Score:</span>
                  <span className="final-score-value">{score}%</span>
                </div>
              </div>
              
              <div className="results-actions">
                <div className={`performance-message ${
                  parseFloat(score) >= 80 ? 'performance-excellent' :
                  parseFloat(score) >= 60 ? 'performance-good' :
                  'performance-needs-improvement'
                }`}>
                  <div className="performance-title">
                    {parseFloat(score) >= 80 ? '🎉 Excellent Performance!' :
                     parseFloat(score) >= 60 ? '👍 Good Job!' :
                     '📚 Keep Practicing!'}
                  </div>
                  <div className="performance-description">
                    {parseFloat(score) >= 80 ? 'Outstanding work! You have a strong grasp of the concepts.' :
                     parseFloat(score) >= 60 ? 'Well done! You have a good understanding, with room for improvement.' :
                     'Don\'t worry, practice makes perfect. Review the topics and try again.'}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowResults(false);
                    setAnswers({});
                    setCurrentQuestion(0);
                    setSelectedAnswer('');
                    setTimeRemaining(3600);
                    setScore(0);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Take Test Again
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="action-button action-secondary"
                >
                  Print Results
                </button>

                <button
                  onClick={() => {
                    if (onTestComplete) {
                      onTestComplete();
                    }
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time's up overlay */}
      {timeRemaining === 0 && !showResults && (
        <div className="modal-overlay">
          <div className="timeout-modal">
            <h2 className="timeout-title">Time's Up!</h2>
            <p className="timeout-message">The exam time has expired. Your answers will be automatically submitted.</p>
            <button
              onClick={handleSubmit}
              className="timeout-button"
            >
              View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;