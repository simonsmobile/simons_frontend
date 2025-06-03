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

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "search":
        return (
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "video":
        return (
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        );
      case "shield":
        return (
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "puzzle":
        return (
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
        );
      default:
        return null;
    }
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
              {[
                { id: 1, icon: "search" },
                { id: 2, icon: "users" },
                { id: 3, icon: "video" },
                { id: 4, icon: "shield" },
                { id: 5, icon: "puzzle" },
              ].map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-center p-3 rounded-lg ${
                    completedCategories.includes(category.id)
                      ? "bg-amber-100 hover:bg-amber-200 border-2 border-amber-300"
                      : "bg-gray-200 hover:bg-gray-300 border-2 border-gray-300"
                  }`}
                >
                  <div
                    className={`${
                      completedCategories.includes(category.id)
                        ? "bg-amber-600"
                        : "bg-black"
                    } text-white p-2 rounded-lg flex items-center justify-center`}
                  >
                    {getCategoryIcon(category.icon)}
                  </div>
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
                  <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-gray-600">
                      {totalQuestions - completedCount}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Remaining Questions</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-amber-600">
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
          <div className="text-center mt-6">
            {calculateProgress() === 100 ? (
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
                Go to Dashboard
              </Link>
            ) : null}
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
