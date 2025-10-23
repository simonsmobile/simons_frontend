import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";

import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const CategorySelectionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );

    const updatedCategories = categories.map((category) => {
      const categoryNumber = parseInt(category.id);
      return {
        ...category,
        completed: completedCategories.includes(categoryNumber),
      };
    });

    setCategories(updatedCategories);
  }, []);

  const hasAnyCompletedCategories = () => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );
    return completedCategories.length > 0;
  };
  const translatedCategories = t("competence_areas" , { returnObjects: true });

  const [categories, setCategories] = useState([
    {
      id: "1",
      title: translatedCategories[1].name,
      icon: "search",
      points: [1.1, 1.2, 1.3],
      description:
        translatedCategories[1].description,
    },
    {
      id: "2",
      title: translatedCategories[2].name,
      icon: "users",
      points: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
      description:
        translatedCategories[2].description,
    },
    {
      id: "3",
      title: translatedCategories[3].name,
      icon: "video",
      points: [3.1, 3.2, 3.3, 3.4],
      description: translatedCategories[3].description,
    },
    {
      id: "4",
      title: translatedCategories[4].name,
      icon: "shield",
      points: [4.1, 4.2, 4.3, 4.4],
      description:
        translatedCategories[4].description,
    },
    {
      id: "5",
      title: translatedCategories[5].name,
      icon: "puzzle",
      points: [5.1, 5.2, 5.3, 5.4],
      description: translatedCategories[5].description,
    },
  ]);

  const handleCategorySelect = (category) => {
    const filteredQuestions = env.QS_MAIN.filter((question) =>
      category.points.some(
        (point) =>
          Math.floor(question.points) === Math.floor(point) ||
          question.points === point
      )
    );

    navigate("/questionnaire", {
      state: {
        questionnaire: filteredQuestions,
        selectedCategory: category.title,
        isPartialAssessment: true,
      },
    });
  };

  const handleFullAssessment = () => {
    navigate("/questionnaire", {
      state: {
        questionnaire: env.QS_MAIN,
        isPartialAssessment: false,
      },
    });
  };

  const getIconComponent = (iconName) => {
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
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "video":
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
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
        );
      case "shield":
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      case "puzzle":
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
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.198-.525-.741-.848-1.316-.68a.978.978 0 0 0-.725.949c0 .207-.032.412-.094.609-.193.607-.637 1.049-1.242 1.242-.197.062-.402.094-.61.094a.978.978 0 0 0-.949.725c-.168.575.156 1.118.68 1.316.445.166.855.498.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.319.049-.629-.145-.739-.445a.993.993 0 0 0-.93-.646.98.98 0 0 1-.976-.976.993.993 0 0 0-.646-.93c-.3-.11-.494-.42-.445-.738.06-.38-.113-.76-.29-.878L3.707 12.88c-.47-.47-.706-1.087-.706-1.704s.235-1.233.706-1.704l1.611-1.611a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925.198.525.741.848 1.316.68a.978.978 0 0 0 .725-.949c0-.207.032-.412.094-.609.193-.607.637-1.049 1.242-1.242.197-.062.402-.094.61-.094a.978.978 0 0 0 .949-.725c.168-.575-.156-1.118-.68-1.316-.445-.166-.855-.498-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707 2.402 2.402 0 0 1 1.704.706l1.568 1.568c.23.23.556.338.877.29.319-.05.629.145.739.445a.993.993 0 0 0 .93.646.98.98 0 0 1 .976.976.993.993 0 0 0 .646.93c.3.11.494.42.445.738z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const checkAllCategoriesComplete = () => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );
    const allCategories = [1, 2, 3, 4, 5];
    return allCategories.every((cat) => completedCategories.includes(cat));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/quest-begin" className="text-gray-800">
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
            {t('self_assessment')}
          </h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('select_one_area')}
            </h2>
            <p className="text-gray-600">
              {t('select_area_explanation')}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`w-full rounded-lg p-4 flex items-center transition-colors duration-200 ${
                  category.completed
                    ? "bg-amber-100 hover:bg-amber-200 border-2 border-amber-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="bg-black text-white p-2 rounded-lg mr-4">
                  {getIconComponent(category.icon)}
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    {category.completed && (
                      <span className="ml-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        {t('Completed')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-800"
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
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleFullAssessment}
              className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
            >
             {t('start_full')}
            </button>

            {hasAnyCompletedCategories() && (
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 bg-amber-400 text-black font-medium rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300"
              >
                {t('go_to_dashboard')}
              </button>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">

              {t('full_assessment_explanation')}
            </p>
          </div>
        </div>
        <div className="text-center mt-4 mb-2">
          <Link
            to="/quest-begin"
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
                d="M15 5l-7 7 7 7"
              />
            </svg>
            {t('check_progress')}
          </Link>
        </div>
        <div className="text-center mt-4 mb-2">
          {checkAllCategoriesComplete() ? (
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
              {t('go_to_dashboard')}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center space-x-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="w-full relative min-h-16">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default CategorySelectionScreen;
