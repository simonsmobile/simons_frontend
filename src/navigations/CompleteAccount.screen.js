import React from 'react';
import { Link } from 'react-router-dom';

const CompleteAccountScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-primary mb-2">Account Created!</h1>
        <p className="text-gray-600 mb-8">
          Your account has been successfully created. Please read the instructions before proceeding.
        </p>
        
        <div className="border border-accent bg-amber-50 rounded-lg p-4 mb-8 text-left">
          <h2 className="font-medium text-lg mb-2">Next Steps:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Complete all the self-assessment questions in the survey</li>
            <li>The assessment contains 82 questions and takes about 20 minutes</li>
            <li>Your results will help identify areas for improvement</li>
            <li>Learning materials will be suggested based on your assessment</li>
          </ul>
        </div>
        
        <Link 
          to="/instructions" 
          className="w-full inline-block py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
        >
          Continue to Instructions
        </Link>
      </div>
    </div>
  );
};

export default CompleteAccountScreen;