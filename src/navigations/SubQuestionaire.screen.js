import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const SubQuestionnaireScreen = () => {
  const location = useLocation();
  const { index, level, category, sub } = location.state;
  
  const getFilteredRandomQuestions = (questionnaire, level, type) => {

    const filteredQuestions = questionnaire.filter(
      (q) => q.level === level && q.type === type
    );

    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 3);
  };

  const [questionnaire, setQuestionaire] = useState(getFilteredRandomQuestions(
    env.QS_SAMPLE2,
    level,
    sub.category
  ));
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('sub_answers');
    return savedAnswers ? JSON.parse(savedAnswers) : Array(questionnaire.length).fill(null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sub_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const selectedAnswerIndex = answers[currentQuestionIndex];
    setSelected(selectedAnswerIndex !== null && selectedAnswerIndex !== undefined);
  }, [currentQuestionIndex, answers]);

  if (!questionnaire || questionnaire.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
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
    navigate('/sub-end-screen', { 
      state: { 
        answers, 
        questionnaire, 
        subIndex: index, 
        category, 
        level, 
        sub 
      } 
    });
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];
  
  const progressPercentage = ((currentQuestionIndex + 1) / questionnaire.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="px-4 py-3 flex items-center">
          <Link to="/study" className="text-gray-800" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="text-center flex-1">
            <span className="text-sm text-gray-500">Question</span>
            <h1 className="text-lg font-semibold">{currentQuestionIndex + 1} of {questionnaire.length}</h1>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
              {level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{category}</h2>
            {sub && (
              <p className="text-gray-600 text-sm">
                {sub.category} - {sub.title}
              </p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-gray-600">Select the option that best describes your knowledge</p>
          </div>

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

export default SubQuestionnaireScreen;