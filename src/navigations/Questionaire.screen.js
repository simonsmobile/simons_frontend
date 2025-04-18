import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const QuestionnaireScreen = () => {
  const location = useLocation();
  const { questionnaire } = location.state || { questionnaire: [] };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  // Initialize answers array with 82 null values if there are no saved answers
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : Array(82).fill(null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const selectedAnswerIndex = answers[currentQuestionIndex];
    setSelected(selectedAnswerIndex !== null && selectedAnswerIndex !== undefined);
  }, [currentQuestionIndex, answers]);

  if (!questionnaire || questionnaire.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white">
        <div className="w-16 h-16 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading questions...</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleOptionChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
    setSelected(true);
  };

  const handleFinish = async () => {
    localStorage.setItem('passed', "Passed");
    await axios.patch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}`, { status: "Passed" });
    navigate('/end-screen', { state: { answers, questionnaire } });
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questionnaire.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with progress bar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        {/* Progress indicator */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="px-4 py-3 flex items-center">
          <Link to="/quest-begin" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="text-center flex-1">
            <span className="text-sm text-gray-500">Question</span>
            <h1 className="text-lg font-semibold">{currentQuestionIndex + 1} of {questionnaire.length}</h1>
          </div>
          <div className="w-6"></div> {/* For balance */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Category tag */}
          {currentQuestion.category && (
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-4">
              {currentQuestion.category}
            </div>
          )}

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-2">{currentQuestion.question}</h2>
            <p className="text-sm text-gray-600">Select the option that best describes your level of competence</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  selectedAnswerIndex === index 
                    ? 'border-accent bg-amber-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handleOptionChange(index)}
              >
                <label className="flex items-start cursor-pointer">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      name="option"
                      className="h-4 w-4 text-accent border-gray-300 focus:ring-accent"
                      checked={selectedAnswerIndex === index}
                      onChange={() => handleOptionChange(index)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Back
            </button>
            
            {currentQuestionIndex < questionnaire.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!selected}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;