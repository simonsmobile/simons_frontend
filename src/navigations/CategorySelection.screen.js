import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";

const CategorySelectionScreen = () => {
  const navigate = useNavigate();
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

  const [categories, setCategories] = useState([
    {
      id: "1",
      title: "Information and data literacy",
      icon: "search",
      points: [1.1, 1.2, 1.3],
      description:
        "Browsing, searching, filtering, evaluating and managing data",
    },
    {
      id: "2",
      title: "Communication and collaboration",
      icon: "users",
      points: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
      description:
        "Interacting, sharing, collaborating through digital technologies",
    },
    {
      id: "3",
      title: "Digital content creation",
      icon: "video",
      points: [3.1, 3.2, 3.3, 3.4],
      description: "Developing, integrating and re-elaborating digital content",
    },
    {
      id: "4",
      title: "Safety",
      icon: "shield",
      points: [4.1, 4.2, 4.3, 4.4],
      description:
        "Protecting devices, personal data, health and the environment",
    },
    {
      id: "5",
      title: "Problem solving",
      icon: "puzzle",
      points: [5.1, 5.2, 5.3, 5.4],
      description: "Solving technical problems and identifying needs",
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
            Self-assessment
          </h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Select one area to start
            </h2>
            <p className="text-gray-600">
              Choose a specific competence area or take the full assessment
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`w-full rounded-lg p-4 flex items-center transition-colors duration-200 ${
                  category.completed
                    ? "bg-green-100 hover:bg-green-200 border-2 border-green-300"
                    : "bg-amber-100 hover:bg-amber-200"
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
                      <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Completed
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

          <button
            onClick={handleFullAssessment}
            className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            Take Full Assessment
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              The full assessment contains all 82 questions and provides a
              complete evaluation of your digital competence
            </p>
          </div>
        </div>
        <div className="text-center mt-4 mb-2">
          <button
            onClick={async () => {
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

              navigate("/end-screen", {
                state: {
                  answers: JSON.parse(localStorage.getItem("answers") || "[]"),
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
        <div className="text-center mt-6 mb-6">
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
