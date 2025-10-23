import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import env from "../configs/env";
import { FaChevronLeft, FaClock } from "react-icons/fa";
import { calculateTimeBonus } from "../utils/scoring";
import SCORING_CONFIG from '../configs/scoringConfig';

import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const SubQuestionnaireScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["ui", "questions"]);
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

  const [timeRemaining, setTimeRemaining] = useState(
    SCORING_CONFIG.TIME_LIMIT_SECONDS
  );
  const [timeTaken, setTimeTaken] = useState(
    Array(questionnaire.length).fill(0)
  );
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(true);

   const { shuffledOptions, correctIndexMap } = useMemo(() => {
    if (!questionnaire || questionnaire.length === 0) {
      return { shuffledOptions: [], correctIndexMap: {} };
    }
    const currentQuestion = questionnaire[currentQuestionIndex];
    if (!currentQuestion) {
        return { shuffledOptions: [], correctIndexMap: {} };
    }

    const optionsWithIndices = currentQuestion.options.map((option, index) => ({
      text: option,
      originalIndex: index,
    }));

    const shuffled = [...optionsWithIndices].sort(() => 0.5 - Math.random());
    
    const newCorrectIndexMap = {};
    shuffled.forEach((option, newIndex) => {
        newCorrectIndexMap[option.originalIndex] = newIndex;
    });

    return { shuffledOptions: shuffled, correctIndexMap: newCorrectIndexMap };
  }, [currentQuestionIndex, questionnaire]);

  useEffect(() => {
    if (!isTimerActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeRemaining]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeRemaining(SCORING_CONFIG.TIME_LIMIT_SECONDS);
    setQuestionStartTime(Date.now());
    setIsTimerActive(true);
  }, [currentQuestionIndex]);

  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);

    // Record time taken as maximum
    const newTimeTaken = [...timeTaken];
    newTimeTaken[currentQuestionIndex] = SCORING_CONFIG.TIME_LIMIT_SECONDS;
    setTimeTaken(newTimeTaken);

    // Auto-advance to next question or finish
    setTimeout(() => {
      if (currentQuestionIndex < questionnaire.length - 1) {
        handleNext();
      } else {
        handleFinish();
      }
    }, 1000);
  }, [currentQuestionIndex, questionnaire.length, timeTaken]);

  // Initialize questionnaire and answers
  useEffect(() => {
    const newQuestionnaire = getFilteredRandomQuestions(
      env.QS_SAMPLE2,
      currentLevelIdentifier,
      subCategoryIdentifier
    );
    setQuestionnaire(newQuestionnaire);
    setAnswers(Array(newQuestionnaire.length).fill(null));
    setTimeTaken(Array(newQuestionnaire.length).fill(0));
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
    // Record time taken for current question
    const questionTime = Math.round((Date.now() - questionStartTime) / 1000);
    const newTimeTaken = [...timeTaken];
    newTimeTaken[currentQuestionIndex] = Math.min(
      questionTime,
      SCORING_CONFIG.TIME_LIMIT_SECONDS
    );
    setTimeTaken(newTimeTaken);

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
    if (!isTimerActive && timeRemaining <= 0) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    setSelected(true);
  };

  const handleFinish = async () => {
    // Record final question time if still active
    if (isTimerActive && currentQuestionIndex < questionnaire.length) {
      const questionTime = Math.round((Date.now() - questionStartTime) / 1000);
      const newTimeTaken = [...timeTaken];
      newTimeTaken[currentQuestionIndex] = Math.min(
        questionTime,
        SCORING_CONFIG.TIME_LIMIT_SECONDS
      );
      setTimeTaken(newTimeTaken);
    }

    localStorage.removeItem(
      `sub_answers_${subCategoryIdentifier}_${currentLevelIdentifier}`
    );

    navigate("/sub-end-screen", {
      state: {
        answers,
        questionnaire,
        timeTaken,
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

  const translated_question = t("questions." + currentQuestion.title, { ns: "questions", returnObjects: true });
//  console.log(translated_question);

  // Calculate potential time bonus for current answer
  const potentialTimeBonus = selected ? calculateTimeBonus(timeRemaining) : 0;
  const basePoints =
    level === "basic"
      ? SCORING_CONFIG.LEVEL_1_BASE_POINTS
      : SCORING_CONFIG.LEVEL_2_BASE_POINTS;

  // Timer display colors
  const getTimerColor = () => {
    if (timeRemaining > 39) return "text-green-600";
    if (timeRemaining > 19) return "text-yellow-600";
    return "text-red-600";
  };

  const getTimerBgColor = () => {
    if (timeRemaining > 39) return "bg-green-100";
    if (timeRemaining > 19) return "bg-yellow-100";
    return "bg-red-100";
  };

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
            <h1 className="text-lg font-semibold">{t(category)}</h1>
            <p className="text-xs text-gray-500">
              {t(sub.title)} ({t(displayLevel)})
            </p>
          </div>

          {/* Timer Display */}
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getTimerBgColor()}`}
          >
            <FaClock className={`h-4 w-4 ${getTimerColor()}`} />
            <span className={`text-sm font-bold ${getTimerColor()}`}>
              {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Question Number and Scoring Info */}
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-gray-500">
            {t('question')} {currentQuestionIndex + 1} {t('of')} {questionnaire.length}
            </span>
            <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-600">
              <div className="bg-blue-50 px-2 py-1 rounded">
                {t('base')}: {basePoints} {t('points')}
              </div>
            </div>
          </div>

          {/* Time Warning */}
          {timeRemaining <= 10 && timeRemaining > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 text-sm font-medium">
                ⏰ {t('time_running_out', {timeRemaining})}
              </p>
            </div>
          )}

          {/* Timeout Message */}
          {timeRemaining === 0 && (
            <div className="mb-4 p-3 bg-gray-100 border border-gray-300 rounded-lg text-center">
              <p className="text-gray-700 text-sm font-medium">
                ⏱️ {t('time_up')}
              </p>
            </div>
          )}

          {/* Question Text */}
          <div className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {translated_question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {shuffledOptions.map((option, shuffledIndex) => (
              <div
                key={shuffledIndex}
                className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
                  timeRemaining === 0
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    : selectedAnswerIndex === option.originalIndex
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300"
                    : "border-gray-200 bg-white hover:border-gray-400"
                }`}
                onClick={() => handleOptionChange(option.originalIndex)}
              >
                <label
                  className={`flex items-center ${
                    timeRemaining === 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name={`option-${currentQuestionIndex}`}
                    className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500 mr-3 flex-shrink-0"
                    checked={selectedAnswerIndex === option.originalIndex}
                    onChange={() => handleOptionChange(option.originalIndex)}
                    disabled={timeRemaining === 0}
                    aria-labelledby={`option-label-${currentQuestionIndex}-${shuffledIndex}`}
                  />
                  <span
                    id={`option-label-${currentQuestionIndex}-${shuffledIndex}`}
                    className="text-sm font-medium text-gray-800"
                  >
                    {translated_question.options[option.originalIndex]}
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
              {t('back')}
            </button>

            {currentQuestionIndex < questionnaire.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selected && timeRemaining > 0}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected && timeRemaining > 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {timeRemaining === 0 ? t('next') : t('next')}
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!selected && timeRemaining > 0}
                className={`flex-1 py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                  !selected && timeRemaining > 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
              >
                {t('finish')}
              </button>
            )}
          </div>

          {/* Scoring Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t('scoring_info')}
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• {t('correct_answer', {basePoints})}</div>
              <div>
                • {t('speed_bonus') }
              </div>
              <div>• {t('perfect_run')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubQuestionnaireScreen;
