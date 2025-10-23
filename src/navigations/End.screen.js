import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import env from "../configs/env";
import { useToast } from "../hooks/useToast";
import '../i18n'; // Ensure i18n is initialized

const EndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const {t} = useTranslation();

  const {
    answers = [],
    questionnaire = [],
    isPartialAssessment = false,
    selectedCategory = null,
  } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const hasSubmitted = useRef(false);

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
    if (checkAllCategoriesComplete()) {
      navigate("/dashboard");
    } else {
      navigate("/category-selection");
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const checkAllCategoriesComplete = () => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );
    return [1, 2, 3, 4, 5].every((cat) => completedCategories.includes(cat));
  };

  useEffect(() => {
    const calculateAndSubmitMarks = async () => {
      if (hasSubmitted.current) return;

      let localQuestionnaire, localAnswers;

      if (isPartialAssessment && !checkAllCategoriesComplete()) {
        localQuestionnaire = questionnaire;
        localAnswers = answers;
      } else {
        localQuestionnaire = env.QS_MAIN;
        localAnswers = JSON.parse(localStorage.getItem("answers") || "[]");
      }

      if (localAnswers.length !== localQuestionnaire.length) {
        console.error("Questionnaire and answers mismatch!");
        setLoading(false);
        setProcessingComplete(true);
        return;
      }

      let pointsArray = Array(21).fill(0);
      let questionCounts = Array(21).fill(0);
      let updatedGrades = Array(21).fill("F");

      for (let i = 0; i < localQuestionnaire.length; i++) {
        let answerValue = localAnswers[i] !== null ? localAnswers[i] + 1 : 0;
        let full = localQuestionnaire[i].points;
        const index = gradesType.findIndex(
          (grade) => grade === full.toString()
        );
        if (index !== -1) {
          pointsArray[index] += answerValue;
          questionCounts[index]++;
        }
      }

      for (let i = 0; i < pointsArray.length; i++) {
        if (questionCounts[i] > 0) {
          let maxPoints = questionCounts[i] * 4;
          let scorePercentage = (pointsArray[i] / maxPoints) * 100;

          if (scorePercentage >= 90) updatedGrades[i] = "M";
          else if (scorePercentage >= 75) updatedGrades[i] = "B";
          else if (scorePercentage >= 50) updatedGrades[i] = "B";
          else updatedGrades[i] = "F";
        }
      }

      if (isPartialAssessment) {
        const categoryNumber = Math.floor(questionnaire[0].points);
        const filteredResults = gradesType
          .filter((grade) => grade.startsWith(categoryNumber.toString()))
          .map((grade) => {
            const gradeIndex = gradesType.findIndex((g) => g === grade);
            return {
              grade,
              value: updatedGrades[gradeIndex],
            };
          });
        setCategoryResults(filteredResults);

        const completedCategories = JSON.parse(
          localStorage.getItem("completedCategories") || "[]"
        );
        if (!completedCategories.includes(categoryNumber)) {
          completedCategories.push(categoryNumber);
          localStorage.setItem(
            "completedCategories",
            JSON.stringify(completedCategories)
          );
        }

        // Submit partial assessment data to backend
        hasSubmitted.current = true;
        try {
          await axios.post(
            `${env.SERVER_URL}/auth/student/${localStorage.getItem(
              "username"
            )}/new_tests`,
            {
              type: "pre-assessment-partial",
              date: new Date().toISOString().split("T")[0],
              category: categoryNumber,
              questions: localQuestionnaire.map((q, i) => ({
                ...q,
                selectedAnswer:
                  localAnswers[i] !== null ? q.options[localAnswers[i]] : null,
              })),
              answers: localAnswers,
              grades: updatedGrades,
            }
          );
        } catch (error) {
          console.error("Error submitting partial assessment:", error);
          toast.error("Failed to save results. Please try again.");
        }
      }

      if (checkAllCategoriesComplete() || !isPartialAssessment) {
        hasSubmitted.current = true;
        try {
          await axios.post(
            `${env.SERVER_URL}/auth/student/${localStorage.getItem(
              "username"
            )}/new_tests`,
            {
              type: "pre-assessment",
              date: new Date().toISOString().split("T")[0],
              questions: localQuestionnaire.map((q, i) => ({
                ...q,
                selectedAnswer:
                  localAnswers[i] !== null ? q.options[localAnswers[i]] : null,
              })),
              answers: localAnswers,
              grades: updatedGrades,
            }
          );

          localStorage.setItem("passed", "Passed");
          await axios.patch(
            `${env.SERVER_URL}/auth/student/${localStorage.getItem(
              "username"
            )}`,
            { status: "Passed" }
          );
        } catch (error) {
          console.error("Error submitting pre-assessment:", error);
          toast.error("Failed to save results. Please try again.");
        }
      }

      setLoading(false);
      setProcessingComplete(true);
    };

    calculateAndSubmitMarks();
  }, []);

  const getSubcategoryName = (grade) => {
    const subcategories = {
      1.1: t('competence_details_short.1_1.title'),
      1.2: t('competence_details_short.1_2.title'),
      1.3: t('competence_details_short.1_3.title'),
      2.1: t('competence_details_short.2_1.title'),
      2.2: t('competence_details_short.2_2.title'),
      2.3: t('competence_details_short.2_3.title'),
      2.4: t('competence_details_short.2_4.title'),
      2.5: t('competence_details_short.2_5.title'),
      2.6: t('competence_details_short.2_6.title'),
      3.1: t('competence_details_short.3_1.title'),
      3.2: t('competence_details_short.3_2.title'),
      3.3: t('competence_details_short.3_3.title'),
      3.4: t('competence_details_short.3_4.title'),
      4.1: t('competence_details_short.4_1.title'),
      4.2: t('competence_details_short.4_2.title'),
      4.3: t('competence_details_short.4_3.title'),
      4.4: t('competence_details_short.4_4.title'),
      5.1: t('competence_details_short.5_1.title'),
      5.2: t('competence_details_short.5_2.title'),
      5.3: t('competence_details_short.5_3.title'),
      5.4: t('competence_details_short.5_4.title'),
    };
    return subcategories[grade] || grade;
  };

  const getGradeLabel = (grade) => {
    switch (grade) {
      case "C":
        return t('level_2');
      case "M":
        return t('level_1');
      case "B":
        return t('level_1');
      case "F":
        return t('not_attempted');
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
            ? t('self_assessment') + ": "+ `${selectedCategory}`
            : "Self-Assessment"}
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                
                {t('processing_selfassessment')}
              </h2>
              <p className="text-center text-gray-600">
                {t('please_wait')}
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
                  {checkAllCategoriesComplete()
                    ? t('full_completed')
                    : t('category_completed') }
                </h2>
                <p className="text-gray-600">
                  
                  {t('succesfully_completed_questions', {completedCount})}
                  {checkAllCategoriesComplete()
                    ? t('starting_level_determined') 
                    : t('complete_others')}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                <div className="grid">
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <span className="block text-2xl font-bold text-amber-600">
                      {completedCount}
                    </span>
                    <span className="text-sm text-gray-600">
                     {t('questions_answered')}
                    </span>
                  </div>
                </div>
              </div>

              {isPartialAssessment && categoryResults.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">
                    {t('results')}: {selectedCategory} 
                  </h3>
                  <div className="space-y-3">
                    {categoryResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0"
                      >
                        <p className="text-xs text-gray-600">
                          {getSubcategoryName(result.grade)}
                        </p>
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
                <h3 className="font-medium text-gray-900 mb-2">{t('next_steps')}</h3>
                <p className="text-sm text-gray-800">
                  {checkAllCategoriesComplete()
                    ? t('self_assessment_complete') 
                    : t('continue_to_next') }
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
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
                : checkAllCategoriesComplete()
                ?  t('go_to_dashboard')
                : t('continue_to_other') }
            </button>

            {isPartialAssessment && !checkAllCategoriesComplete() && (
              <button
                onClick={goToDashboard}
                disabled={loading || !processingComplete}
                className={`w-full py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  loading || !processingComplete
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-amber-400 text-black hover:bg-amber-500"
                }`}
              >
                {t('go_to_dashboard')}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full relative min-h-16">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default EndScreen;
