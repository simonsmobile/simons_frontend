import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";

const BeginScreen = () => {
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(env.QS_MAIN);
  const [survey, setSurvey] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [totalCategories] = useState(5);
  const totalQuestions = 82;

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers");
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const completed = answers.filter((answer) => answer !== null).length;
      setCompletedCount(completed);
      setSurvey(completed > 0);
    }
    const savedCompletedCategories = localStorage.getItem(
      "completedCategories"
    );
    if (savedCompletedCategories) {
      setCompletedCategories(JSON.parse(savedCompletedCategories));
    }
  }, []);

  const startFullQuestionnaire = () => {
    navigate("/questionnaire", {
      state: {
        questionnaire,
        isPartialAssessment: false,
      },
    });
  };

  const startCategorySelection = () => {
    navigate("/category-selection");
  };

  const calculateProgress = () => {
    return Math.round((completedCount / totalQuestions) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-8">
        <div className="flex items-center">
          <Link to="/confirmation" className="text-gray-800">
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
            Assessment Status
          </h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Your Progress
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {completedCount > 0
                    ? `You've completed ${completedCount} out of ${totalQuestions} questions`
                    : "Start your assessment to track progress"}
                </p>
              </div>

              <div className="p-5">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-800 bg-amber-100">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-amber-600">
                        {calculateProgress()}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${calculateProgress()}%` }}
                      className="bg-amber-400 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Category Progress
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((category) => (
                <div
                  key={category}
                  className={`h-16 flex items-center justify-center rounded-lg ${
                    completedCategories.includes(category)
                      ? "bg-green-100 border-2 border-green-300"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span
                    className={`text-lg font-bold ${
                      completedCategories.includes(category)
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {category}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              <span className="font-medium">{completedCategories.length}</span>{" "}
              of <span className="font-medium">{totalCategories}</span>{" "}
              categories completed
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {completedCount === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                  <span className="text-xl font-bold text-amber-600">
                    {totalQuestions}
                  </span>
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
                    <span className="text-xl font-bold text-amber-600">
                      {totalQuestions - completedCount}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Remaining Questions</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-green-600">
                      {completedCount}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Completed Questions</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={startCategorySelection}
              className="w-full py-3 bg-amber-400 text-black font-medium rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300 focus:outline-none flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>Assessment by Category</span>
            </button>

            <button
              onClick={startFullQuestionnaire}
              className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none relative z-10"
            >
              {completedCount > 0
                ? "Continue Full Assessment"
                : "Start Full Assessment"}
            </button>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>
                Estimated time:{" "}
                {Math.ceil((totalQuestions - completedCount) * 0.25)} minutes
              </p>
            </div>
          </div>
          <div className="text-center mt-4 mb-2">
            <button
              onClick={async () => {
                // Mark as passed
                localStorage.setItem("passed", "Passed");
                try {
                  await axios.patch(
                    `${env.SERVER_URL}/auth/student/${localStorage.getItem(
                      "username"
                    )}`,
                    { status: "Passed" }
                  );
                } catch (error) {
                  console.error("Error updating status:", error);
                }

                // Navigate to end screen with current results
                navigate("/end-screen", {
                  state: {
                    answers: JSON.parse(
                      localStorage.getItem("answers") || "[]"
                    ),
                    questionnaire: env.QS_MAIN,
                    isPartialAssessment: false,
                  },
                });
              }}
              className="text-gray-600 text-sm hover:underline inline-flex items-center justify-center"
            >
              Complete Now & See Results
            </button>
          </div>
          <div className="text-center mt-6">
            <Link
              to="/dashboard"
              className="text-gray-600 text-sm hover:underline inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Skip to Dashboard
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

export default BeginScreen;
