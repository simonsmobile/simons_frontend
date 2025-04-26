import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import env from "../configs/env";
import { FaChevronLeft } from "react-icons/fa";

const SubQuestionnaireScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { index, level, category, sub } = location.state || {};

  const getFilteredRandomQuestions = (questionnaire, levelId, typeId) => {
    if (!questionnaire || !levelId || !typeId) return [];
    const filteredQuestions = questionnaire.filter(
      (q) => q.level === levelId && q.type === typeId
    );
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const currentLevelIdentifier = level === "basic" ? "basic" : "master";
  const subCategoryIdentifier = sub?.category;

  const [questionnaire, setQuestionnaire] = useState(() =>
    getFilteredRandomQuestions(
      env.QS_SAMPLE2,
      currentLevelIdentifier,
      subCategoryIdentifier
    )
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(
      `sub_answers_${subCategoryIdentifier}_${currentLevelIdentifier}`
    );
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : Array(questionnaire.length).fill(null);
  });

  useEffect(() => {
    setQuestionnaire(
      getFilteredRandomQuestions(
        env.QS_SAMPLE2,
        currentLevelIdentifier,
        subCategoryIdentifier
      )
    );
    setAnswers(
      Array(
        getFilteredRandomQuestions(
          env.QS_SAMPLE2,
          currentLevelIdentifier,
          subCategoryIdentifier
        ).length
      ).fill(null)
    );
    setCurrentQuestionIndex(0);
  }, [level, sub]);

  useEffect(() => {
    localStorage.setItem(
      `sub_answers_${subCategoryIdentifier}_${currentLevelIdentifier}`,
      JSON.stringify(answers)
    );
  }, [answers, subCategoryIdentifier, currentLevelIdentifier]);

  useEffect(() => {
    if (
      questionnaire.length > 0 &&
      currentQuestionIndex < questionnaire.length
    ) {
      const selectedAnswerIndex = answers[currentQuestionIndex];
      setSelected(
        selectedAnswerIndex !== null && selectedAnswerIndex !== undefined
      );
    } else {
      setSelected(false);
    }
  }, [currentQuestionIndex, answers, questionnaire]);

  if (!level || !category || !sub) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: Missing quiz context.
      </div>
    );
  }

  if (!questionnaire || questionnaire.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
        <p className="text-gray-600">
          No quiz questions found for this section and level.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleOptionChange = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    setSelected(true);
  };

  const handleFinish = async () => {
    localStorage.removeItem(
      `sub_answers_${subCategoryIdentifier}_${currentLevelIdentifier}`
    );
    navigate("/sub-end-screen", {
      state: {
        answers,
        questionnaire,
        subIndex: index,
        category,
        level,
        sub,
      },
    });
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questionnaire.length) * 100;
  const displayLevel = level === "basic" ? "Level 1" : "Level 2";
  const scoreSoFar = answers.reduce((count, ans, idx) => {
    if (
      ans !== null &&
      questionnaire[idx]?.options[ans] === questionnaire[idx]?.answer
    ) {
      return count + 50;
    }
    return count;
  }, 0);
  const maxPossibleScore = questionnaire.length * 50;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-800">
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-semibold">{category}</h1>
            <p className="text-xs text-gray-500">
              {sub.category} - {sub.title} ({displayLevel})
            </p>
          </div>
          {/* Score Display */}
          <div className="text-right w-16">
            <span className="text-sm font-medium text-gray-700">
              {scoreSoFar}/{maxPossibleScore}
            </span>
            <span className="text-xs block text-gray-500">Points</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Question Number */}
          <div className="text-center mb-6">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questionnaire.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedAnswerIndex === optionIndex
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300"
                    : "border-gray-200 bg-white hover:border-gray-400"
                }`}
                onClick={() => handleOptionChange(optionIndex)}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`option-${currentQuestionIndex}`}
                    className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500 mr-3 flex-shrink-0"
                    checked={selectedAnswerIndex === optionIndex}
                    onChange={() => handleOptionChange(optionIndex)}
                    aria-labelledby={`option-label-${currentQuestionIndex}-${optionIndex}`}
                  />
                  <span
                    id={`option-label-${currentQuestionIndex}-${optionIndex}`}
                    className="text-sm font-medium text-gray-800"
                  >
                    {option}
                  </span>
                </label>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Back
            </button>

            {currentQuestionIndex < questionnaire.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!selected}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubQuestionnaireScreen;
