import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import env from '../configs/env';
import axios from 'axios';

const SubEndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], questionnaire = [], category, level, sub, subIndex } = location.state || {};
  const [grades, setGrades] = useState(['F', 'F', 'F', 'F', 'F']);
  const [isPass, setPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);

  const [gradesType, setGradesType] = useState([
    'Information & Data Literacy',
    'Com. & Collaboration',
    'Digital Content Creation',
    'Safety',
    'Problem Solving'
  ]);
  
  const completedCount = answers.filter(answer => answer !== null).length;
  
  const correctCount = questionnaire.reduce((count, q, index) => {
    const selectedOption = q.options[answers[index]];
    return selectedOption === q.answer ? count + 1 : count;
  }, 0);
  
  const getIdByTitle = (title) => {
    const item = env.QS_CAT.find((category) => category.title === title);
    return item ? item.id : null; 
  };

  const startQuestionnaire = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('sub_answers');
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleNavigation = (index, level, category, sub) => {
    navigate('/study', { state: { index, level, category, sub } });
  };

  const retrievePrevious = async (qs, answers) => {
    try {
      const response = await fetch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}/tests`);
      const data = await response.json();

      if (data) {
        const originalResults = data.firstTest?.grades || [];
        const progressResults = data.lastTest?.grades || originalResults;

        console.log("DATA", progressResults);

        calculateMarks(qs, answers, progressResults);
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
      setLoading(false);
    }
  };

  const calculateMarks = async (qs, answers, prev) => {
    let pointsArray = [0, 0, 0, 0, 0];
    let marks = 4*qs.length;
    let updatedGrades = prev || ['F', 'F', 'F', 'F', 'F'];
    let current = sub ? getIdByTitle(sub.title) : 0;
    let pointValue = 0;
    
    if (current || current === 0) {
      pointValue = pointsArray[current];
    } 
  
    let score = (correctCount / completedCount);
    
    if (score === 1) {
      setPass(true);
      if (level === "basic") {
        updatedGrades[current] = "M";
      } else if (level === "master") {
        updatedGrades[current] = "C";
      }
    } 
      
    setGrades(updatedGrades);

    await axios.post(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}/tests`, { 
      date: new Date().toISOString().split('T')[0],
      questions: qs,
      answers,
      grades: updatedGrades,
      points: pointsArray
    });
  
    setLoading(false);

    setTimeout(() => {
      setProcessingComplete(true);
    }, 500);
    
    return updatedGrades;
  };

  useEffect(() => {
    retrievePrevious(questionnaire, answers);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <Link to="/study" className="text-gray-800" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Quiz Results</h1>
          <div className="w-6"></div> 
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Processing Your Results</h2>
              <p className="text-center text-gray-600">
                Please wait while we analyze your responses.
              </p>
            </div>
          ) : (
            <div className={`transition-opacity duration-500 ${processingComplete ? 'opacity-100' : 'opacity-0'}`}>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
                  {level.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{category}</h2>
                {sub && (
                  <p className="text-gray-600">
                    {sub.category} - {sub.title}
                  </p>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Quiz Results</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${isPass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isPass ? 'Passed' : 'Not Passed'}
                    </div>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="text-3xl font-bold text-green-600">{correctCount}</span>
                    <p className="text-sm text-gray-600 mt-1">Correct</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="text-3xl font-bold text-red-600">{completedCount - correctCount}</span>
                    <p className="text-sm text-gray-600 mt-1">Incorrect</p>
                  </div>
                </div>

                <div className="p-4 flex justify-center">
                  <div className="relative inline-flex">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                      <div 
                        className={`h-full ${isPass ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${(correctCount / completedCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                      {Math.round((correctCount / completedCount) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {!isPass && (
                  <button 
                    onClick={() => handleNavigation(subIndex, level, category, sub)} 
                    className="w-full py-3 bg-accent text-black font-medium rounded-md shadow-md hover:bg-amber-400 transition-colors duration-300"
                  >
                    Review Learning Materials
                  </button>
                )}
                <button 
                  onClick={startQuestionnaire} 
                  className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    'Return to Dashboard'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubEndScreen;