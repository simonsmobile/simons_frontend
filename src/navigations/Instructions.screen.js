import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InstructionsScreen = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>
      
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-5">
        <div className="flex items-center">
          <Link to="/complete-account" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Instructions</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg mb-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-800 text-sm leading-relaxed">
                The initial assessment contains a comprehensive set of 82 self-assessment questions. This test may take
                about 20 minutes to complete. Therefore, you are advised to respond to all the questions with due attention
                so that the app suggests you take necessary learning materials corresponding to the specific area of digital
                competence you need to improve, based on your own self-assessment.
              </p>
            </div>
          </div>

          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Please read the following instructions carefully:
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
            <ol className="divide-y divide-gray-200">
              <li className="p-4 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">1</div>
                <div>
                  <p className="text-gray-700">Dedicate appropriate time and attention for the assessment.</p>
                </div>
              </li>
              <li className="p-4 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">2</div>
                <div>
                  <p className="text-gray-700">Complete all the self-assessment questions in the survey.</p>
                </div>
              </li>
              <li className="p-4 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">3</div>
                <div>
                  <p className="text-gray-700">Do not refresh the page while taking the survey.</p>
                </div>
              </li>
              <li className="p-4 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">4</div>
                <div>
                  <p className="text-gray-700">If you encounter any issues, contact support.</p>
                </div>
              </li>
              <li className="p-4 flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 text-sm">5</div>
                <div>
                  <p className="text-gray-700">Review your answers before submitting the survey.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex items-start space-x-3 mb-8 py-2">
            <input
              type="checkbox"
              id="acceptInstructions"
              className="mt-1 h-5 w-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              checked={isAccepted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="acceptInstructions" className="text-gray-700">
              I have read and accept the instructions.
            </label>
          </div>

          <Link
            to={isAccepted ? "/confirmation" : "#"}
            onClick={(e) => !isAccepted && e.preventDefault()}
            className={`w-full inline-block py-3 text-center font-medium rounded-md shadow-md transition-colors duration-300 ${
              isAccepted
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
      
      {/* Bottom design element */}
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default InstructionsScreen;