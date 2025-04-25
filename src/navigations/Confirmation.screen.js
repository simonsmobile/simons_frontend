import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmationScreen = () => {
  const [passed, setPassed] = useState(false);
  const navigate = useNavigate();

  const checkPass = () => {
    if (localStorage.getItem("passed") === "Passed") setPassed(true);
  };

  useEffect(() => {
    checkPass();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-8">
        <div className="flex items-center">
          <Link to="/instructions" className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">
            Survey Status
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 p-4 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-medium text-gray-900 text-lg">
                  Survey Status
                </h2>
                <p className="text-gray-600 mt-1">
                  {passed
                    ? "You have already completed this survey"
                    : "You haven't attempted the survey yet"}
                </p>
              </div>
            </div>
          </div>

          {!passed && (
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-amber-500">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-amber-500">
                      0%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div className="w-0 bg-amber-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
            <div className="flex">
              <svg
                className="w-6 h-6 text-amber-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-700 text-sm">
                The survey contains 82 questions about your digital
                competencies. Your results will help identify areas for
                improvement and provide personalized learning materials.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute -right-10 -top-8 w-24 h-24 bg-amber-200 rounded-full opacity-30 z-0"></div>
            <Link
              to="/quest-begin"
              className="w-full inline-block py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 text-center relative z-10"
            >
              {passed ? "Review Survey Results" : "Begin Survey"}
            </Link>
          </div>

          {passed && (
            <div className="text-center mt-6">
              <Link
                to="/dashboard"
                className="text-black font-medium hover:underline inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom design element */}
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
