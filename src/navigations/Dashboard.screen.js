import React, { useEffect, useState, useRef } from "react";
import {
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaEllipsisV,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import {
  calculateScores,
  COMPETENCE_AREAS,
  getSubCompetencesForArea,
  getGradeStatus,
  getIconForStatus,
  getCompetenceLevelText,
} from "../utils/scoring";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState(null);
  const [latestGrades, setLatestGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("username")?.split("@")[0] || "User"
  );
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.SERVER_URL}/auth/student/${localStorage.getItem(
            "username"
          )}/tests`
        );
        const grades = response.data?.lastTest?.grades || Array(21).fill("F");
        setLatestGrades(grades);
        const calculated = calculateScores(grades);
        setScores(calculated);

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
        setScores(calculateScores(defaultGrades));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        const toggleButton = document.getElementById("header-dashboard-button");
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("username");
    localStorage.removeItem("passed");
    localStorage.removeItem("answers");
    localStorage.removeItem("completedCategories");
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`category_answers_${i}`);
    }
    navigate("/login");
  };

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const navigateToStudy = (areaId, subCompetencePoint, levelNumber, status) => {
    if (status === "Locked") {
      console.log(
        `Navigation blocked: Level ${levelNumber} for ${subCompetencePoint} is locked.`
      );
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
      },
    });
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
      <header className="bg-white text-gray-800 shadow-md sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center relative">
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/Picturec.png`}
              alt="SIMOnS Logo"
              className="h-8 w-auto mr-2"
            />
            <h1 className="text-xl font-bold text-black">SIMOnS</h1>
          </div>
          <button
            id="header-dashboard-button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FaEllipsisV className="text-gray-600 h-5 w-5" />
          </button>

          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-4 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-30 py-1"
            >
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-xl mx-auto px-4 py-6 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {userName}
          </h2>
          <p className="text-sm text-gray-600">
            Your digital competence dashboard
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/badge.png`}
              alt="Badge"
              className="h-12 w-12 mr-3"
            />
            <div>
              <h3 className="text-lg font-bold text-amber-600">
                {scores.totalScore} points
              </h3>
              <p className="text-xs text-gray-500">Current achievement score</p>
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
            {scores.areaScores.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-xs font-medium text-amber-700">
                    {item.score} / {item.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-6">
          <h3 className="text-lg font-bold text-gray-900 p-4 border-b border-gray-200">
            Competence Areas
          </h3>
          <div className="divide-y divide-gray-200">
            {COMPETENCE_AREAS.map((area, index) => {
              const isExpanded = expandedCategory === index;
              const subCompetences = getSubCompetencesForArea(area.id);

              return (
                <div key={area.id}>
                  <button
                    className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => handleCategoryClick(index)}
                  >
                    <span className="font-medium text-gray-800">
                      {area.name}
                    </span>
                    {isExpanded ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pt-2 pb-4 bg-gray-50 border-t border-gray-200">
                      <ul className="space-y-3 mt-2">
                        {subCompetences.map((sub) => {
                          const gradeIndex = GRADES_TYPE.findIndex(
                            (g) => g === sub.point
                          );
                          const grade =
                            gradeIndex !== -1 && latestGrades[gradeIndex]
                              ? latestGrades[gradeIndex]
                              : "F";
                          const levelText = getCompetenceLevelText(grade);
                          const statusLevel1 = getGradeStatus(grade, 1);
                          const statusLevel2 = getGradeStatus(grade, 2);
                          const IconLevel1 = getIconForStatus(statusLevel1);
                          const IconLevel2 = getIconForStatus(statusLevel2);

                          return (
                            <li
                              key={sub.point}
                              className="p-3 bg-white rounded-md border border-gray-100 shadow-sm"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1 mr-3">
                                  <p className="text-sm font-medium text-gray-800">
                                    {sub.point} {sub.title}
                                  </p>
                                  <p
                                    className={`text-xs mt-1 font-medium ${
                                      levelText === "Advanced"
                                        ? "text-green-600"
                                        : levelText === "Intermediate"
                                        ? "text-blue-600"
                                        : levelText === "Foundation"
                                        ? "text-amber-700"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    Level: {levelText}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
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
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                      statusLevel1 === "Completed"
                                        ? "bg-green-100 text-green-600 ring-green-200 hover:bg-green-200"
                                        : statusLevel1 === "Locked"
                                        ? "bg-gray-200 text-gray-400 ring-gray-300 cursor-not-allowed"
                                        : "bg-gray-200 text-gray-700 ring-gray-300 hover:bg-gray-300"
                                    }`}
                                    title={`Level 1: ${statusLevel1}`}
                                  >
                                    <IconLevel1 className="w-5 h-5" />
                                  </button>

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
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                      statusLevel2 === "Locked"
                                        ? "bg-gray-100 text-gray-500 ring-gray-200 cursor-not-allowed"
                                        : statusLevel2 === "Completed"
                                        ? "bg-green-100 text-green-600 ring-green-200 hover:bg-green-200"
                                        : "bg-amber-100 text-amber-700 ring-amber-200 hover:bg-amber-200"
                                    }`}
                                    title={`Level 2: ${statusLevel2}`}
                                  >
                                    <IconLevel2 className="w-5 h-5" />
                                  </button>
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

        <div className="text-center mt-8">
          <Link
            to="/quest-begin"
            className="inline-block px-6 py-3 bg-amber-300 text-black font-medium rounded-md shadow-md hover:bg-amber-400 transition-colors duration-300"
          >
            Take Assessment Again
          </Link>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardScreen;
