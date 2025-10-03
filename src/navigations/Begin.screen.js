import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import env from "../configs/env";
import CategoryTooltip from "../components/CategoryTooltip";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const BeginScreen = () => {
  const navigate = useNavigate();
  
  const [questionnaire, setQuestionnaire] = useState(env.QS_MAIN);
  const [survey, setSurvey] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [totalCategories] = useState(5);
  const totalQuestions = 82;
  const { t, i18n } = useTranslation();

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
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
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

  const categories = [
    { id: 1, icon: "search" },
    { id: 2, icon: "users" },
    { id: 3, icon: "video" },
    { id: 4, icon: "shield" },
    { id: 5, icon: "puzzle" },
  ];

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
            {t('assessment_status')}
          </h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {t('your_progress')}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {completedCount > 0
                    ? t('you_have_completed', {completedCount, totalQuestions})
                    : t('start_assessment')}
                </p>
              </div>

              <div className="p-5">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-800 bg-amber-100">
                        {t('progress')}
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

          <CategoryTooltip
            categories={categories}
            completedCategories={completedCategories}
            getCategoryIcon={getCategoryIcon}
          />

          <div className="grid grid-cols-1 gap-4 mb-8">
            {completedCount === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                  <span className="text-xl font-bold text-amber-600">
                    {totalQuestions}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{t('total_available_questions')}</p>
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
                    <p className="text-gray-700">{t('remaining_questions')}</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full mr-4">
                    <span className="text-xl font-bold text-amber-600">
                      {completedCount}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{t('completed_questions')}</p>
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
              <span>{t('assessment_by_category')}</span>
            </button>

            <button
              onClick={startFullQuestionnaire}
              className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none relative z-10"
            >
              {completedCount > 0
                ? t('continue_full')
                : t('start_full')}
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
                {t('estimated_time')}:{" "}
                {Math.ceil((totalQuestions - completedCount) * 0.25)} {t('minutes')}
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
