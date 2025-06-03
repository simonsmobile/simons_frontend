import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import env from "../configs/env";
import { useToast } from "../hooks/useToast";
import axios from "axios";

const EndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    answers = [],
    questionnaire = [],
    isPartialAssessment = false,
    selectedCategory = null,
  } = location.state || {};
  const [grades, setGrades] = useState(Array(21).fill("F"));
  const [loading, setLoading] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);

  const [gradesType] = useState([
    "1.1",
    "1.2",
    "1.3",
    "2.1",
    "2.2",
    "2.3",
    "2.4",
    "2.5",
    "2.6",
    "3.1",
    "3.2",
    "3.3",
    "3.4",
    "4.1",
    "4.2",
    "4.3",
    "4.4",
    "5.1",
    "5.2",
    "5.3",
    "5.4",
  ]);

  const completedCount = answers.filter((answer) => answer !== null).length;

  const handleContinue = () => {
    if (isPartialAssessment) {
      if (checkAllCategoriesComplete()) {
        toast.success(
          "Congratulations! You've completed all categories!"
        );
      }
      navigate("/category-selection");
    } else {
      navigate("/dashboard");
    }
  };

  const calculateMarks = async (qs, answers) => {
    if (qs.length !== answers.length) {
      console.error("Questionnaire and answers must have the same length!");
      return;
    }

    let pointsArray = Array(21).fill(0);
    let marks = [
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 3,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 5,
      4 * 3,
      4 * 4,
      4 * 4,
      4 * 4,
      4 * 3,
      4 * 4,
    ];
    let updatedGrades = Array(21).fill("F");

    for (let i = 0; i < qs.length; i++) {
      let answerValue = answers[i] !== null ? answers[i] + 1 : 0;
      let full = qs[i].points;
      const index = gradesType.findIndex((grade) => grade === full.toString());
      if (index !== -1) {
        pointsArray[index] += answerValue;
      }
    }

    for (let i = 0; i < pointsArray.length; i++) {
      let score = (100 * pointsArray[i]) / marks[i];

      if (score >= 90) {
        updatedGrades[i] = "C";
      } else if (score >= 75) {
        updatedGrades[i] = "M";
      } else if (score >= 50) {
        updatedGrades[i] = "B";
      } else {
        updatedGrades[i] = "F";
      }
    }

    setGrades(updatedGrades);

    if (isPartialAssessment) {
      const categoryNumber = Math.floor(questionnaire[0].points);
      const filteredResults = gradesType
        .filter((grade) => grade.startsWith(categoryNumber.toString()))
        .map((grade, idx) => {
          const gradeIndex = gradesType.findIndex((g) => g === grade);
          return {
            grade,
            value: updatedGrades[gradeIndex],
          };
        });
      setCategoryResults(filteredResults);
    }

    if (!isPartialAssessment) {
      await axios.post(
        `${env.SERVER_URL}/auth/student/${localStorage.getItem(
          "username"
        )}/new_tests`,
        {
          date: new Date().toISOString().split("T")[0],
          questions: qs,
          answers,
          grades: updatedGrades,
          points: pointsArray,
        }
      );
    }

    setLoading(false);

    setTimeout(() => {
      setProcessingComplete(true);
    }, 1000);

    return updatedGrades;
  };

  useEffect(() => {
    const processResults = async () => {
      try {
        const result = await calculateMarks(questionnaire, answers);

        if (isPartialAssessment && result) {
          const completedCategories = JSON.parse(
            localStorage.getItem("completedCategories") || "[]"
          );

          const categoryNumber = Math.floor(questionnaire[0].points);

          if (!completedCategories.includes(categoryNumber)) {
            completedCategories.push(categoryNumber);
            localStorage.setItem(
              "completedCategories",
              JSON.stringify(completedCategories)
            );
          }

          const allCategories = [1, 2, 3, 4, 5];
          const allComplete = allCategories.every((cat) =>
            completedCategories.includes(cat)
          );

          if (allComplete) {
            localStorage.setItem("passed", "Passed");

            try {
              await axios.patch(
                `${env.SERVER_URL}/auth/student/${localStorage.getItem(
                  "username"
                )}`,
                { status: "Passed" }
              );
            } catch (error) {
              console.error("Error updating completion status:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error processing results:", error);
        setLoading(false);
      }
    };

    processResults();
  }, []);

  const checkAllCategoriesComplete = () => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );
    return [1, 2, 3, 4, 5].every((cat) => completedCategories.includes(cat));
  };

  const getSubcategoryName = (grade) => {
    const subcategories = {
      1.1: "Browsing, searching and filtering data",
      1.2: "Evaluating data",
      1.3: "Managing data",
      2.1: "Interacting through digital technologies",
      2.2: "Sharing information",
      2.3: "Engaging in citizenship",
      2.4: "Collaborating through digital technologies",
      2.5: "Netiquette",
      2.6: "Managing digital identity",
      3.1: "Developing digital content",
      3.2: "Integrating and re-elaborating digital content",
      3.3: "Copyright and licenses",
      3.4: "Programming",
      4.1: "Protecting devices",
      4.2: "Protecting personal data and privacy",
      4.3: "Protecting health and well-being",
      4.4: "Protecting the environment",
      5.1: "Solving technical problems",
      5.2: "Identifying needs and technological responses",
      5.3: "Creatively using digital technologies",
      5.4: "Identifying digital competence gaps",
    };
    return subcategories[grade] || grade;
  };

  const getGradeLabel = (grade) => {
    switch (grade) {
      case "C":
        return "Level 2";
      case "M":
        return "Level 1 - Mastery";
      case "B":
        return "Level 1 - Basic";
      case "F":
        return "Not Achieved";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <h1 className="text-lg font-semibold text-center">
          {isPartialAssessment
            ? `${selectedCategory} Assessment`
            : "Assessment"}
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Processing Your Assessment
              </h2>
              <p className="text-center text-gray-600">
                Please wait while we analyze your responses and determine your
                starting levels.
              </p>
            </div>
          ) : (
            <div
              className={`transition-opacity duration-500 ${
                processingComplete ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-amber-500"
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
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isPartialAssessment
                    ? `Category Assessment Complete!`
                    : "Assessment Assessment Complete!"}
                </h2>
                <p className="text-gray-600">
                  You've successfully completed {completedCount} questions.
                  {isPartialAssessment
                    ? ` Your ${selectedCategory} starting levels have been determined.`
                    : " Your starting levels for all competences have been determined."}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                <div className="grid">
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <span className="block text-2xl font-bold text-amber-600">
                      {completedCount}
                    </span>
                    <span className="text-sm text-gray-600">
                      Questions Answered
                    </span>
                  </div>
                </div>
              </div>

              {isPartialAssessment && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">
                    {selectedCategory} Assessment Results
                  </h3>
                  <div className="space-y-3">
                    {categoryResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-gray-100 pb-2"
                      >
                        <div>
                          <p className="text-xs text-gray-600">
                            {getSubcategoryName(result.grade)}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.value === "C"
                              ? "bg-green-100 text-green-800"
                              : result.value === "M"
                              ? "bg-blue-100 text-blue-800"
                              : result.value === "B"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {getGradeLabel(result.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                <h3 className="font-medium text-gray-900 mb-2">Next Steps</h3>
                <p className="text-sm text-gray-800">
                  {isPartialAssessment
                    ? "The assessment determines which levels you can access. Complete other categories to start earning points through timed exercises!"
                    : "Your assessment is complete! Start earning points by taking timed exercises for each competence level."}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={loading || !processingComplete}
            className={`w-full py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
              loading || !processingComplete
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading
              ? "Processing..."
              : isPartialAssessment
              ? "Back to Categories"
              : "Go to Dashboard"}
          </button>
        </div>
      </div>

      <div className="w-full relative min-h-16">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default EndScreen;
