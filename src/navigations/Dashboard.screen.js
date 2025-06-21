import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import Header from "./Header";
import { useToast } from "../hooks/useToast";
import {
  calculateScores,
  COMPETENCE_AREAS,
  getSubCompetencesForArea,
  getGradeStatus,
  getIconForStatus,
  getCompetenceLevelText,
  getGamificationDetails,
  getAreaLevelDisplay,
  getProgressPercentage,
} from "../utils/scoring";

import RisingStarBadge from "../assets/badges/RisingStarBadge";
import SavvyMentorBadge from "../assets/badges/SavvyMentorBadge";
import SimonsAdvocateBadge from "../assets/badges/SimonsAdvocateBadge";

const getCompetenceArea = (point) => {
  return Math.floor(parseFloat(point));
};

const DashboardScreen = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [scores, setScores] = useState(null);
  const [latestGrades, setLatestGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("username")?.split("@")[0] || "User"
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [gamification, setGamification] = useState(null);
  const [completedLevels, setCompletedLevels] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.SERVER_URL}/auth/student/${localStorage.getItem(
            "username"
          )}/new_tests`
        );

        const backendData = response.data;
        const grades = backendData?.grades || Array(21).fill("F");
        setLatestGrades(grades);

        setCompletedLevels(backendData?.completedLevels || {});

        const calculated = calculateScores(grades, backendData);
        setScores(calculated);

        const gameDetails = getGamificationDetails(
          backendData.totalScore,
          backendData.allLevelsComplete
        );
        setGamification(gameDetails);

        try {
          const userResponse = await axios.get(
            `${env.SERVER_URL}/auth/student/${localStorage.getItem("username")}`
          );
          const userData = userResponse.data;
          if (userData && userData.firstName) {
            setUserName(
              `${userData.firstName} ${userData.lastName || ""}`.trim()
            );
          }
        } catch (userError) {
          console.warn("Could not fetch full user data, using email prefix.");
        }
      } catch (error) {
        console.error("Error fetching score data:", error);
        const defaultGrades = Array(21).fill("F");
        setLatestGrades(defaultGrades);
        setScores(calculateScores(defaultGrades, null));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const navigateToStudy = (areaId, subCompetencePoint, levelNumber, status) => {
    if (status === "Locked") {
      const competenceArea = getCompetenceArea(subCompetencePoint);
      const completedCategories = JSON.parse(
        localStorage.getItem("completedCategories") || "[]"
      );
      const isFullAssessmentDone = localStorage.getItem("passed") === "Passed";

      if (
        !isFullAssessmentDone &&
        !completedCategories.includes(competenceArea)
      ) {
        toast.warning(
          `Complete the self-assessment for this category first to unlock exercises.`,
          "Area Locked"
        );
        return;
      }
      return;
    }

    const mainArea = COMPETENCE_AREAS.find((a) => a.id === areaId);
    const subDetails = getSubCompetencesForArea(areaId).find(
      (sc) => sc.point === subCompetencePoint
    );

    const gradeIndex = GRADES_TYPE.findIndex((g) => g === subCompetencePoint);
    const grade =
      gradeIndex !== -1 && latestGrades[gradeIndex]
        ? latestGrades[gradeIndex]
        : "F";

    navigate("/study", {
      state: {
        index: areaId - 1,
        level: levelNumber === 1 ? "basic" : "master",
        category: mainArea?.name,
        sub: {
          category: subDetails?.point,
          title: subDetails?.title,
          icon: subDetails?.icon,
        },
        grade: grade,
        isCompleted: status === "Completed",
      },
    });
  };

  const handleRetakeAssessment = () => {
    setShowConfirmationModal(true);
  };

  const hasIncompleteCategories = () => {
    const completedCategories = JSON.parse(
      localStorage.getItem("completedCategories") || "[]"
    );
    const isFullAssessmentDone = localStorage.getItem("passed") === "Passed";
    const allCategories = [1, 2, 3, 4, 5];

    if (isFullAssessmentDone) return false;

    return allCategories.some((cat) => !completedCategories.includes(cat));
  };

  const confirmRetake = async () => {
    const toastId = toast.loading("Resetting your progress...");
    try {
      await axios.delete(
        `${env.SERVER_URL}/auth/student/${localStorage.getItem(
          "username"
        )}/tests/reset`
      );

      localStorage.removeItem("passed");
      localStorage.removeItem("answers");
      localStorage.removeItem("completedCategories");
      localStorage.removeItem("unlockedAvatars");
      localStorage.removeItem("currentAvatar");
      for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`category_answers_${i}`);
      }

      toast.dismiss(toastId);
      toast.success(
        "Progress reset! You can now start the self-assessment again."
      );
      setShowConfirmationModal(false);
      navigate("/quest-begin");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to reset progress. Please try again.");
      console.error("Error resetting progress:", error);
      setShowConfirmationModal(false);
    }
  };

  const cancelRetake = () => {
    setShowConfirmationModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 mb-4">Could not load user data.</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const GRADES_TYPE = [
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
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header showSimonsText={true} showMenuButton={true} />
      <main className="flex-1 max-w-xl mx-auto px-4 py-6 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {userName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Your digital competence dashboard
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Ready to level up? Take training exercises and quizzes to earn more
            points!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {gamification ? (
              <div className="h-12 w-12 mr-3">
                {gamification.badge === "star" ? (
                  <RisingStarBadge className="h-full w-full" />
                ) : gamification.badge === "mentor" ? (
                  <SavvyMentorBadge className="h-full w-full" />
                ) : gamification.badge === "advocate" ? (
                  <SimonsAdvocateBadge className="h-full w-full" />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="Badge"
                    className="h-12 w-12 mr-3"
                  />
                )}
              </div>
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="Badge"
                className="h-12 w-12 mr-3"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-amber-600">
                {scores.totalScore} points
              </h3>
              <p className="text-xs text-gray-500">
                {gamification
                  ? gamification.title
                  : "Current achievement score"}
              </p>
            </div>
          </div>
          <Link
            to="/score"
            className="text-sm font-medium text-black bg-amber-300 px-3 py-1.5 rounded-md hover:bg-amber-400 transition-colors"
          >
            View Score
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-5 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Competence Overview
          </h3>
          <div className="space-y-3">
            {scores.areaScores.map((item) => {
              const percentage = getProgressPercentage(item.competenceDetails);
              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-amber-700">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-6">
          <h3 className="text-lg font-bold text-gray-900 p-4 border-b border-gray-200">
            Training exercises
          </h3>
          <div className="divide-y divide-gray-200">
            {COMPETENCE_AREAS.map((area, areaIndex) => {
              const isExpanded = expandedCategory === areaIndex;
              const subCompetences = getSubCompetencesForArea(area.id);
              const areaData = scores.areaScores.find((a) => a.id === area.id);
              const levelDisplay = getAreaLevelDisplay(
                areaData,
                completedLevels,
                latestGrades
              );

              return (
                <div key={area.id}>
                  <button
                    className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => handleCategoryClick(areaIndex)}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-12 rounded-md bg-black flex flex-col items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-[10px] leading-tight text-center px-1">
                          {levelDisplay.includes("-") ? (
                            <span className="block">{levelDisplay}</span>
                          ) : (
                            levelDisplay
                          )}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{area.name}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-24 bg-gray-300 rounded-full h-2 mr-2">
                            <div
                              className="bg-gray-800 h-2 rounded-full"
                              style={{
                                width: `${getProgressPercentage(
                                  areaData.competenceDetails
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      {isExpanded ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pt-2 pb-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-3 mt-2 bg-amber-300 rounded-t-lg px-4 py-2">
                        <span className="font-bold text-gray-900">
                          Competences
                        </span>
                        <div className="flex space-x-8">
                          <span className="font-bold text-gray-900">
                            Level 1
                          </span>
                          <span className="font-bold text-gray-900">
                            Level 2
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-0 bg-white rounded-b-lg border border-gray-200 overflow-hidden">
                        {subCompetences.map((sub, subIndex) => {
                          const gradeIndex = GRADES_TYPE.findIndex(
                            (g) => g === sub.point
                          );
                          const grade =
                            gradeIndex !== -1 && latestGrades[gradeIndex]
                              ? latestGrades[gradeIndex]
                              : "F";

                          const competenceDetail =
                            areaData.competenceDetails.find(
                              (cd) => cd.point === sub.point
                            );
                          const quizProgress = competenceDetail?.quizProgress;

                          const levelText = getCompetenceLevelText(grade);
                          const statusLevel1 = getGradeStatus(
                            grade,
                            1,
                            quizProgress,
                            sub.point
                          );
                          const statusLevel2 = getGradeStatus(
                            grade,
                            2,
                            quizProgress,
                            sub.point
                          );

                          const IconLevel1 = getIconForStatus(statusLevel1);
                          const IconLevel2 = getIconForStatus(statusLevel2);

                          const competenceNumber =
                            COMPETENCE_AREAS.slice(0, areaIndex).reduce(
                              (total, prevArea) =>
                                total +
                                getSubCompetencesForArea(prevArea.id).length,
                              0
                            ) +
                            subIndex +
                            1;

                          return (
                            <li
                              key={sub.point}
                              className="p-4 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex-1 mr-4">
                                  <p className="text-sm font-medium text-gray-800">
                                    {competenceNumber}. {sub.title}
                                  </p>
                                  <div className="flex items-center mt-1 space-x-2">
                                    <p className="text-xs text-gray-600">
                                      Placement: {levelText}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-8 flex-shrink-0">
                                  {/* Level 1 Button */}
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={() =>
                                        navigateToStudy(
                                          area.id,
                                          sub.point,
                                          1,
                                          statusLevel1
                                        )
                                      }
                                      disabled={statusLevel1 === "Locked"}
                                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                        statusLevel1 === "Completed"
                                          ? "bg-amber-400 text-white cursor-pointer"
                                          : statusLevel1 === "Locked"
                                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                          : "bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-50"
                                      }`}
                                      title={`Level 1: ${statusLevel1}`}
                                    >
                                      <IconLevel1 className="w-6 h-6" />
                                    </button>
                                    <span
                                      className={`text-xs mt-1 font-medium ${
                                        statusLevel1 === "Completed"
                                          ? "text-amber-600"
                                          : statusLevel1 === "Locked"
                                          ? "text-gray-400"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {statusLevel1}
                                    </span>
                                  </div>

                                  {/* Level 2 Button */}
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={() =>
                                        navigateToStudy(
                                          area.id,
                                          sub.point,
                                          2,
                                          statusLevel2
                                        )
                                      }
                                      disabled={statusLevel2 === "Locked"}
                                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                        statusLevel2 === "Completed"
                                          ? "bg-amber-400 text-white cursor-pointer"
                                          : statusLevel2 === "Locked"
                                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                          : "bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-50"
                                      }`}
                                      title={`Level 2: ${statusLevel2}`}
                                    >
                                      <IconLevel2 className="w-6 h-6" />
                                    </button>
                                    <span
                                      className={`text-xs mt-1 font-medium ${
                                        statusLevel2 === "Completed"
                                          ? "text-amber-600"
                                          : statusLevel2 === "Locked"
                                          ? "text-gray-400"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {statusLevel2}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center flex flex-col space-y-3 mt-8">
          <button
            onClick={handleRetakeAssessment}
            className="px-6 py-2 bg-amber-300 text-black text-sm font-medium rounded-md shadow-md hover:bg-amber-400 transition-colors duration-300"
          >
            Take Self-Assessment Again
          </button>

          {hasIncompleteCategories() && (
            <button
              onClick={() => navigate("/category-selection")}
              className="px-6 py-2 bg-black text-white text-sm font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
            >
              Complete Other Categories
            </button>
          )}
        </div>
      </main>
      <BottomNav />

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Action
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This will delete all your existing test scores and progress, reset
              your leaderboard ranking to 0, and clear your unlocked avatars.
              You'll be able to start the self-assessment from scratch. This
              action cannot be undone. Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelRetake}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmRetake}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
              >
                Confirm & Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
