import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmationScreen = () => {
  const [passed, setPassed] = useState(false);
  const navigate = useNavigate();

  const checkPass = () => {
    if (localStorage.getItem('passed') === "Passed") setPassed(true);
  };

  useEffect(() => {
    checkPass();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/instructions" className="text-gray-800">
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
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium text-gray-900 text-lg">Survey Status</h2>
                <p className="text-gray-600 mt-1">
                  {passed 
                    ? "You have already completed this survey"
                    : "You haven't attempted the survey yet"
                  }
                </p>
              </div>
            </div>
          </div>

          {!passed && (
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-black">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-black">
                      0%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div className="w-0 bg-accent shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-sm">
              The survey contains 82 questions about your digital competencies. Your results will help identify areas for improvement and provide personalized learning materials.
            </p>
          </div>

          <Link
            to="/quest-begin"
            className="w-full inline-block py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 text-center"
          >
            {passed ? "Review Survey Results" : "Begin Survey"}
          </Link>

          {passed && (
            <div className="text-center mt-6">
              <Link to="/dashboard" className="text-black font-medium hover:underline">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;