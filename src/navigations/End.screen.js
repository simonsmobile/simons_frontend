import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import env from "../configs/env";
import axios from "axios";

const EndScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], questionnaire = [] } = location.state || {};
  const [grades, setGrades] = useState(["F", "F", "F", "F", "F"]);
  const [loading, setLoading] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);

  const [gradesType, setGradesType] = useState([
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

  const startQuestionnaire = () => {
    navigate("/dashboard");
  };

  const calculateMarks = async (qs, answers) => {
    if (qs.length !== answers.length) {
      console.error("Questionnaire and answers must have the same length!");
      return;
    }

    let pointsArray = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
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
    let updatedGrades = [
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
    ];

    for (let i = 0; i < qs.length; i++) {
      // Add 1 to each non-null answer, or replace null with 0
      let answerValue = answers[i] !== null ? answers[i] + 1 : 0;

      // Get the point value from the questionnaire
      let full = qs[i].points;

      // Add the answer value to the corresponding category in the pointsArray
      if (full === 1.1) {
        pointsArray[0] += answerValue;
      } else if (full === 1.2) {
        pointsArray[1] += answerValue;
      } else if (full === 1.3) {
        pointsArray[2] += answerValue;
      } else if (full === 2.1) {
        pointsArray[3] += answerValue;
      } else if (full === 2.2) {
        pointsArray[4] += answerValue;
      } else if (full === 2.3) {
        pointsArray[5] += answerValue;
      } else if (full === 2.4) {
        pointsArray[6] += answerValue;
      } else if (full === 2.5) {
        pointsArray[7] += answerValue;
      } else if (full === 2.6) {
        pointsArray[8] += answerValue;
      } else if (full === 3.1) {
        pointsArray[9] += answerValue;
      } else if (full === 3.2) {
        pointsArray[10] += answerValue;
      } else if (full === 3.3) {
        pointsArray[11] += answerValue;
      } else if (full === 3.4) {
        pointsArray[12] += answerValue;
      } else if (full === 4.1) {
        pointsArray[13] += answerValue;
      } else if (full === 4.2) {
        pointsArray[14] += answerValue;
      } else if (full === 4.3) {
        pointsArray[15] += answerValue;
      } else if (full === 4.4) {
        pointsArray[16] += answerValue;
      } else if (full === 5.1) {
        pointsArray[17] += answerValue;
      } else if (full === 5.2) {
        pointsArray[18] += answerValue;
      } else if (full === 5.3) {
        pointsArray[19] += answerValue;
      } else if (full === 5.4) {
        pointsArray[20] += answerValue;
      }
    }

    // Calculate the grade for each category
    for (let i = 0; i < pointsArray.length; i++) {
      let score = (100 * pointsArray[i]) / marks[i];
      if (score >= 80) {
        updatedGrades[i] = "M";
      } else if (score < 80) {
        updatedGrades[i] = "B";
      }
    }

    // Update the grades state
    setGrades(updatedGrades);

    // Update DB
    await axios.post(
      `${env.SERVER_URL}/auth/student/${localStorage.getItem(
        "username"
      )}/tests`,
      {
        date: new Date().toISOString().split("T")[0],
        questions: qs,
        answers,
        grades: updatedGrades,
        points: pointsArray,
      }
    );

    setLoading(false);

    // Show completion animation after a delay
    setTimeout(() => {
      setProcessingComplete(true);
    }, 1000);

    return updatedGrades;
  };

  useEffect(() => {
    calculateMarks(questionnaire, answers);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white px-4 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-center">Survey Completion</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 border-4 border-t-accent border-gray-200 rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Processing Your Results
              </h2>
              <p className="text-center text-gray-600">
                Please wait while we analyze your responses and generate
                personalized insights.
              </p>
            </div>
          ) : (
            <div
              className={`transition-opacity duration-500 ${
                processingComplete ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Survey Completed!
                </h2>
                <p className="text-gray-600">
                  You've successfully completed all {completedCount} questions.
                  Your digital competence profile is now ready.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <span className="block text-2xl font-bold text-amber-600">
                      {completedCount}
                    </span>
                    <span className="text-sm text-gray-600">
                      Questions Answered
                    </span>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <span className="block text-2xl font-bold text-green-600">
                      5
                    </span>
                    <span className="text-sm text-gray-600">
                      Competence Areas
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
                <p className="text-center text-gray-700">
                  Your results have been saved. You can now explore your digital
                  competence profile and access personalized learning materials.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={startQuestionnaire}
            disabled={loading || !processingComplete}
            className={`w-full py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
              loading || !processingComplete
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Processing..." : "Go to Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
