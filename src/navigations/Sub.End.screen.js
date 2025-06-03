import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import env from "../configs/env";
import axios from "axios";
import {
  calculateQuizScore,
  generateQuizFeedback,
  submitQuizResult,
} from "../utils/scoring";

import SCORING_CONFIG from "../configs/scoringConfig";

const SubEndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    answers = [],
    questionnaire = [],
    timeTaken = [],
    category,
    level,
    sub,
    subIndex,
  } = location.state || {};

  const [quizResult, setQuizResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [newGrade, setNewGrade] = useState("F");

  const levelNumber = level === "basic" ? 1 : 2;

  const handleNavigation = (index, level, category, sub) => {
    navigate("/study", { state: { index, level, category, sub } });
  };

  const startQuestionnaire = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("sub_answers");
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  const retakeQuiz = () => {
    navigate("/sub-quest", {
      state: {
        index: subIndex,
        level,
        category,
        sub,
      },
    });
  };

  const processQuizResults = async () => {
    try {
      const result = calculateQuizScore(answers, questionnaire, timeTaken);
      setQuizResult(result);

      const feedbackData = generateQuizFeedback(result, category, levelNumber);
      setFeedback(feedbackData);

      const { correctAnswers, totalQuestions, isPerfect } = result;
      let grade = "F";

      if (correctAnswers === totalQuestions) {
        if (isPerfect) {
          grade = levelNumber === 1 ? "M" : "C";
        } else {
          grade = levelNumber === 1 ? "B" : "M";
        }
      }

      setNewGrade(grade);

      await submitQuizToBackend(result, grade);

      setLoading(false);
      setTimeout(() => {
        setProcessingComplete(true);
      }, 500);
    } catch (error) {
      console.error("Error processing quiz results:", error);
      setLoading(false);
    }
  };

  const submitQuizToBackend = async (result, grade) => {
    try {
      const quizData = {
        grades: [],
        answers,
        questions: questionnaire,
        timeTaken,
        level: levelNumber === 1 ? "basic" : "master",
        competenceArea: sub?.category,
        totalScore: result.totalScore,
        baseScore: result.baseScore,
        timeBonus: result.timeBonus,
        perfectBonus: result.isPerfect
          ? Math.round(SCORING_CONFIG.PERFECT_RUN_BONUS / 21)
          : 0,
        correctAnswers: result.correctAnswers,
        accuracy: result.accuracy,
        isPerfect: result.isPerfect,
      };

      const response = await axios.get(
        `${env.SERVER_URL}/auth/student/${localStorage.getItem(
          "username"
        )}/new_tests`
      );

      const currentGrades =
        response.data?.lastTest?.grades || Array(21).fill("F");

      const competenceMap = {
        1.1: 0,
        1.2: 1,
        1.3: 2,
        2.1: 3,
        2.2: 4,
        2.3: 5,
        2.4: 6,
        2.5: 7,
        2.6: 8,
        3.1: 9,
        3.2: 10,
        3.3: 11,
        3.4: 12,
        4.1: 13,
        4.2: 14,
        4.3: 15,
        4.4: 16,
        5.1: 17,
        5.2: 18,
        5.3: 19,
        5.4: 20,
      };

      const competenceIndex = competenceMap[sub?.category];
      if (
        competenceIndex !== undefined &&
        result.correctAnswers === result.totalQuestions
      ) {
        const existingGradeValue = getGradeValue(
          currentGrades[competenceIndex]
        );
        const newGradeValue = getGradeValue(grade);

        if (newGradeValue > existingGradeValue) {
          currentGrades[competenceIndex] = grade;
        }
      }

      quizData.grades = currentGrades;

      await submitQuizResult(quizData);
    } catch (error) {
      console.error("Error updating backend score:", error);
    }
  };

  const getGradeValue = (grade) => {
    const values = { F: 0, B: 1, M: 2, C: 3 };
    return values[grade] || 0;
  };

  useEffect(() => {
    processQuizResults();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-800">
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
            </button>
            <h1 className="text-lg font-semibold text-center flex-1">
              Processing Results
            </h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-t-amber-400 border-gray-200 rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Calculating Your Score
          </h2>
          <p className="text-center text-gray-600">
            Analysing your performance and time bonuses...
          </p>
        </div>
      </div>
    );
  }

  if (!quizResult || !feedback) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error processing quiz results</p>
        </div>
      </div>
    );
  }

  const {
    correctAnswers,
    totalQuestions,
    totalScore,
    baseScore,
    timeBonus,
    isPerfect,
  } = quizResult;
  const isSuccess = feedback.status === "success";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-800">
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
          </button>
          <h1 className="text-lg font-semibold text-center flex-1">
            Quiz Results
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div
            className={`transition-opacity duration-500 ${
              processingComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  {levelNumber === 1 ? "Level 1" : "Level 2"}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {category}
              </h2>
              {sub && <p className="text-gray-600 text-sm">{sub.title}</p>}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
              <div
                className={`p-6 text-center ${
                  isSuccess ? "bg-amber-50" : "bg-white"
                }`}
              >
                <div
                  className={`text-4xl mb-2 ${
                    isSuccess ? "text-amber-500" : "text-gray-500"
                  }`}
                >
                  {isSuccess ? "🎉" : "📚"}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feedback.title}
                </h3>
                <p className="text-gray-600 mb-4">{feedback.message}</p>
                <div className="text-lg font-semibold text-gray-800">
                  You earned: +{totalScore} points
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-3">
                  Score Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      Correct answers ({correctAnswers}/{totalQuestions})
                    </span>
                    <span className="font-medium">+{baseScore} pts</span>
                  </div>
                  {timeBonus > 0 && (
                    <div className="flex justify-between text-amber-600">
                      <span>Speed bonus</span>
                      <span className="font-medium">+{timeBonus} pts</span>
                    </div>
                  )}
                  {isPerfect && quizResult.perfectBonus > 0 && (
                    <div className="flex justify-between text-purple-600">
                      <span>Perfect score bonus</span>
                      <span className="font-medium">
                        +{quizResult.perfectBonus} pts
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Score</span>
                    <span>+{totalScore} pts</span>
                  </div>
                </div>
              </div>

              {!isSuccess && feedback.details && (
                <div className="p-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">
                    What went wrong?
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-amber-50 rounded">
                      <div className="text-2xl font-bold text-amber-600">
                        {feedback.details.correct}
                      </div>
                      <div className="text-gray-600">Correct</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-black">
                        {feedback.details.incorrect}
                      </div>
                      <div className="text-gray-600">Incorrect</div>
                    </div>
                  </div>

                  {feedback.details.pointsLost > 0 && (
                    <div className="mt-3 p-3 bg-orange-50 rounded text-sm">
                      <div className="font-medium text-orange-800">
                        Missed Opportunity
                      </div>
                      <div className="text-orange-600">
                        You could have earned {feedback.details.pointsLost} more
                        points with correct answers
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!isSuccess && (
                <>
                  <button
                    onClick={() =>
                      handleNavigation(subIndex, level, category, sub)
                    }
                    className="w-full py-3 bg-amber-400 text-black font-medium rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300"
                  >
                    Review Learning Materials
                  </button>
                  <button
                    onClick={retakeQuiz}
                    className="w-full py-3 bg-gray-600 text-white font-medium rounded-md shadow-md hover:bg-gray-700 transition-colors duration-300"
                  >
                    Retake Quiz
                  </button>
                </>
              )}

              <button
                onClick={startQuestionnaire}
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Return to Dashboard"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubEndScreen;
