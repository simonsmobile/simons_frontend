import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import env from "../configs/env";
import { translateLevelTerminology } from '../utils/scoring';
import axios from "axios";

const QuestionnaireScreen = () => {
  const location = useLocation();
  const { questionnaire, selectedCategory, isPartialAssessment } =
    location.state || {
      questionnaire: [],
      selectedCategory: null,
      isPartialAssessment: false,
    };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  const [answers, setAnswers] = useState(() => {
    const mainAnswers = JSON.parse(localStorage.getItem("answers") || "[]");

    if (isPartialAssessment) {
      const categoryNumber = Math.floor(questionnaire[0]?.points || 0);
      const categoryKey = `category_answers_${categoryNumber}`;
      const savedCategoryAnswers = localStorage.getItem(categoryKey);

      if (savedCategoryAnswers) {
        return JSON.parse(savedCategoryAnswers);
      }

      const initialAnswers = Array(questionnaire.length).fill(null);

      questionnaire.forEach((question, index) => {
        const fullQuestionnaireIndex = env.QS_MAIN.findIndex(
          (q) =>
            q.question === question.question && q.points === question.points
        );

        if (
          fullQuestionnaireIndex !== -1 &&
          mainAnswers[fullQuestionnaireIndex] !== undefined
        ) {
          initialAnswers[index] = mainAnswers[fullQuestionnaireIndex];
        }
      });

      return initialAnswers;
    } else {
      return mainAnswers.length > 0
        ? mainAnswers
        : Array(questionnaire.length).fill(null);
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (questionnaire.length === 0) return;

    if (isPartialAssessment) {
      const categoryNumber = Math.floor(questionnaire[0]?.points || 0);
      const categoryKey = `category_answers_${categoryNumber}`;
      localStorage.setItem(categoryKey, JSON.stringify(answers));

      const mainAnswers = JSON.parse(
        localStorage.getItem("answers") ||
          JSON.stringify(Array(env.QS_MAIN.length).fill(null))
      );

      questionnaire.forEach((question, index) => {
        if (answers[index] !== null) {
          const fullQuestionnaireIndex = env.QS_MAIN.findIndex(
            (q) =>
              q.question === question.question && q.points === question.points
          );

          if (fullQuestionnaireIndex !== -1) {
            mainAnswers[fullQuestionnaireIndex] = answers[index];
          }
        }
      });

      localStorage.setItem("answers", JSON.stringify(mainAnswers));
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));

      const categorizedQuestions = {};
      questionnaire.forEach((question, index) => {
        const categoryNumber = Math.floor(question.points);
        if (!categorizedQuestions[categoryNumber]) {
          categorizedQuestions[categoryNumber] = [];
        }
        categorizedQuestions[categoryNumber].push({
          question,
          answerIndex: answers[index],
          originalIndex: index,
        });
      });

      Object.keys(categorizedQuestions).forEach((categoryNumber) => {
        const categoryQuestions = categorizedQuestions[categoryNumber];
        const categoryKey = `category_answers_${categoryNumber}`;

        const categoryQuestionsInEnv = env.QS_MAIN.filter(
          (q) => Math.floor(q.points) === Number(categoryNumber)
        );
        const existingCategoryAnswers = JSON.parse(
          localStorage.getItem(categoryKey) ||
            JSON.stringify(Array(categoryQuestionsInEnv.length).fill(null))
        );

        categoryQuestions.forEach(({ question, answerIndex }) => {
          const categoryQuestionIndex = categoryQuestionsInEnv.findIndex(
            (q) =>
              q.question === question.question && q.points === question.points
          );

          if (categoryQuestionIndex !== -1 && answerIndex !== null) {
            existingCategoryAnswers[categoryQuestionIndex] = answerIndex;
          }
        });

        localStorage.setItem(
          categoryKey,
          JSON.stringify(existingCategoryAnswers)
        );
      });
    }
  }, [answers, isPartialAssessment, questionnaire]);

  useEffect(() => {
    const selectedAnswerIndex = answers[currentQuestionIndex];
    setSelected(
      selectedAnswerIndex !== null && selectedAnswerIndex !== undefined
    );
  }, [currentQuestionIndex, answers]);

  if (!questionnaire || questionnaire.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white">
        <div className="w-16 h-16 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading questions...</p>
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

  const handleOptionChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
    setSelected(true);
  };

  const getCategoryName = (pointsPrefix) => {
    switch (pointsPrefix) {
      case 1:
        return "Information & Data Literacy";
      case 2:
        return "Communication & Collaboration";
      case 3:
        return "Digital Content Creation";
      case 4:
        return "Safety";
      case 5:
        return "Problem Solving";
      default:
        return "General";
    }
  };

  const updateCompletedCategories = (categoryNumber) => {
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

    return completedCategories;
  };

  const checkCategoryCompleteness = (categoryNumber, mainAnswers) => {
    const categoryQuestions = env.QS_MAIN.filter(
      (q) => Math.floor(q.points) === categoryNumber
    );

    const answeredQuestions = categoryQuestions.filter((q, idx) => {
      const questionIndex = env.QS_MAIN.findIndex(
        (mainQ) => mainQ.question === q.question && mainQ.points === q.points
      );
      return questionIndex !== -1 && mainAnswers[questionIndex] !== null;
    });

    return answeredQuestions.length === categoryQuestions.length;
  };

  const handleFinish = async () => {
    const mainAnswers = JSON.parse(
      localStorage.getItem("answers") ||
        JSON.stringify(Array(env.QS_MAIN.length).fill(null))
    );

    if (isPartialAssessment) {
      questionnaire.forEach((question, index) => {
        const fullQuestionnaireIndex = env.QS_MAIN.findIndex(
          (q) =>
            q.question === question.question && q.points === question.points
        );

        if (fullQuestionnaireIndex !== -1) {
          mainAnswers[fullQuestionnaireIndex] = answers[index];
        }
      });

      localStorage.setItem("answers", JSON.stringify(mainAnswers));

      const categoryNumber = Math.floor(questionnaire[0].points);

      if (checkCategoryCompleteness(categoryNumber, mainAnswers)) {
        const completedCategories = updateCompletedCategories(categoryNumber);

        const allCategories = [1, 2, 3, 4, 5];
        const allCompleted = allCategories.every((cat) =>
          completedCategories.includes(cat)
        );

        if (allCompleted) {
          localStorage.setItem("passed", "Passed");
          await axios.patch(
            `${env.SERVER_URL}/auth/student/${localStorage.getItem(
              "username"
            )}`,
            { status: "Passed" }
          );
        }
      }

      navigate("/end-screen", {
        state: {
          answers,
          questionnaire,
          isPartialAssessment: true,
          selectedCategory:
            selectedCategory ||
            getCategoryName(Math.floor(questionnaire[0].points)),
        },
      });
    } else {
      [1, 2, 3, 4, 5].forEach((categoryNumber) => {
        if (checkCategoryCompleteness(categoryNumber, mainAnswers)) {
          updateCompletedCategories(categoryNumber);
        }
      });

      localStorage.setItem("passed", "Passed");
      await axios.patch(
        `${env.SERVER_URL}/auth/student/${localStorage.getItem("username")}`,
        { status: "Passed" }
      );
      navigate("/end-screen", { state: { answers, questionnaire } });
    }
  };

  const currentQuestion = questionnaire[currentQuestionIndex];
  const selectedAnswerIndex = answers[currentQuestionIndex];

  const progressPercentage =
    ((currentQuestionIndex + 1) / questionnaire.length) * 100;

  const getQuestionCategory = (points) => {
    const pointsPrefix = Math.floor(points);
    switch (pointsPrefix) {
      case 1:
        return "Information & Data Literacy";
      case 2:
        return "Communication & Collaboration";
      case 3:
        return "Digital Content Creation";
      case 4:
        return "Safety";
      case 5:
        return "Problem Solving";
      default:
        return "General";
    }
  };

  const getQuestionSubcategory = (points) => {
    const categories = {
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

    return categories[points] || "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm mb-8">
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="px-4 py-3 flex items-center">
          <Link
            to={isPartialAssessment ? "/category-selection" : "/quest-begin"}
            className="text-gray-800"
          >
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
          <div className="text-center flex-1">
            <span className="text-sm text-gray-500">Question</span>
            <h1 className="text-lg font-semibold">
              {currentQuestionIndex + 1} of {questionnaire.length}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-12">
        <div className="max-w-md mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
              {getQuestionCategory(currentQuestion.points)}
            </div>

            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {getQuestionSubcategory(currentQuestion.points)}
            </div>

            <div className="inline-block px-3 py-1 bg-amber-300 text-gray-800 rounded-full text-xs font-medium">
              {translateLevelTerminology(currentQuestion.level)}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              {currentQuestion.question}
            </h2>
            <p className="text-sm text-gray-600">
              Select the option that best describes your level of competence
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  selectedAnswerIndex === index
                    ? "border-accent bg-amber-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => handleOptionChange(index)}
              >
                <label className="flex items-start cursor-pointer">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      name="option"
                      className="h-4 w-4 text-accent border-gray-300 focus:ring-accent"
                      checked={selectedAnswerIndex === index}
                      onChange={() => handleOptionChange(index)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-4 mb-4">
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
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
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
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isPartialAssessment ? "Complete" : "Finish"}
              </button>
            )}
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

export default QuestionnaireScreen;
