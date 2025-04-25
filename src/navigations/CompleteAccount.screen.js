import React from "react";
import { Link } from "react-router-dom";

const CompleteAccountScreen = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-center">Account Created</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md text-center z-10">
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Account Created!
          </h1>
          <p className="text-gray-600 mb-8">
            Your account has been successfully created. Please read the
            instructions before proceeding to the assessment.
          </p>

          <div className="border border-amber-400 bg-amber-50 rounded-lg p-6 mb-8 text-left shadow-sm">
            <h2 className="font-medium text-lg mb-3 text-gray-900">
              Next Steps:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">
                  Complete all the self-assessment questions in the survey
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">
                  The assessment contains 82 questions and takes about 20
                  minutes
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">
                  Your results will help identify areas for improvement
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">
                  Learning materials will be suggested based on your assessment
                </span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -left-12 -bottom-6 w-16 h-16 bg-amber-200 rounded-full opacity-40"></div>
            <Link
              to="/instructions"
              className="w-full inline-block py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none relative z-10"
            >
              Continue to Instructions
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom design element */}
      <div className="w-full relative min-h-16">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default CompleteAccountScreen;
