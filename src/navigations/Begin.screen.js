import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import env from '../configs/env';

const BeginScreen = () => {
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(env.QS_MAIN);
  const [survey, setSurvey] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const totalQuestions = 82;

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const completed = answers.filter(answer => answer !== null).length;
      setCompletedCount(completed);
      setSurvey(completed > 0);
    }
  }, []);

  const startQuestionnaire = () => {
    navigate('/questionnaire', { state: { questionnaire } });
  };

  const calculateProgress = () => {
    return Math.round((completedCount / totalQuestions) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/confirmation" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Survey Status</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {completedCount > 0 
                    ? `You've completed ${completedCount} out of ${totalQuestions} questions` 
                    : "Start your assessment to track progress"
                  }
                </p>
              </div>
              
              <div className="p-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-accent bg-amber-100">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-accent">
                        {calculateProgress()}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${calculateProgress()}%` }} className="bg-accent shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {completedCount === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                  <span className="text-xl font-bold text-accent">{totalQuestions}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">Total Available Questions</p>
                </div>
              </div>
            )}
            
            {completedCount > 0 && (
              <>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-accent">{totalQuestions - completedCount}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Remaining Questions</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-green-600">{completedCount}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Completed Questions</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <button 
            onClick={startQuestionnaire} 
            className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
          >
            {completedCount > 0 ? 'Continue Survey' : 'Start Survey'}
          </button>
          
          <div className="text-center mt-4 text-sm text-gray-600">
            <p>Estimated time: {Math.ceil((totalQuestions - completedCount) * 0.25)} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginScreen;