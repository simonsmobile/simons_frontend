import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import Header from "./Header";
import {
  calculateScores,
  getGamificationDetails,
  getSubCompetencesForArea,
  getAreaLevelDisplay,
  getProgressPercentage,
  getQuizScoresFromBackend,
} from "../utils/scoring";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactConfetti from "react-confetti";

import RisingStarBadge from "../assets/badges/RisingStarBadge";
import SavvyMentorBadge from "../assets/badges/SavvyMentorBadge";
import SimonsAdvocateBadge from "../assets/badges/SimonsAdvocateBadge";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ScoreScreen = () => {
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gamification, setGamification] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [animateBadge, setAnimateBadge] = useState(false);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });
  const gamificationCardRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const [completedLevels, setCompletedLevels] = useState({});
  const [latestGrades, setLatestGrades] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.SERVER_URL}/auth/student/${localStorage.getItem(
            "username"
          )}/new_tests`
        );
        const backendData = response.data;
        const grades = backendData?.grades || null;
        setLatestGrades(grades);
        setCompletedLevels(backendData?.completedLevels || {});

        const calculated = calculateScores(grades, backendData);
        setScores(calculated);
        const gameDetails = getGamificationDetails(backendData.totalScore, backendData.allLevelsComplete);
        setGamification(gameDetails);

        if (gameDetails && gameDetails.threshold > 0) {
          setAnimateBadge(true);
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          animationTimeoutRef.current = setTimeout(() => {
            setAnimateBadge(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
        setScores(calculateScores(null, null));
      } finally {
        setLoading(false);
      }
    };

    fetchScores();

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gamificationCardRef.current) {
      setConfettiSize({
        width: gamificationCardRef.current.offsetWidth,
        height: gamificationCardRef.current.offsetHeight,
      });
    }
    const handleResize = () => {
      if (gamificationCardRef.current) {
        setConfettiSize({
          width: gamificationCardRef.current.offsetWidth,
          height: gamificationCardRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gamification]);

  const toggleCategory = (areaId) => {
    setExpandedCategories((prev) => ({ ...prev, [areaId]: !prev[areaId] }));
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
        <p className="text-red-500 mb-4">Could not load score data.</p>
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Go back to Dashboard
        </Link>
      </div>
    );
  }

  const chartData = {
    labels: scores.areaScores.map((area) => area.name),
    datasets: [
      {
        label: "Points Earned",
        data: scores.areaScores.map((area) => area.score),
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderColor: "rgba(217, 119, 6, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(217, 119, 6, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(217, 119, 6, 1)",
      },
    ],
  };

  const maxAreaScore = Math.max(
    ...scores.areaScores.map((area) => area.maxScore)
  );

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: "rgba(0, 0, 0, 0.1)" },
        suggestedMin: 0,
        suggestedMax: maxAreaScore,
        ticks: {
          stepSize: Math.ceil(maxAreaScore / 5),
          backdropColor: "transparent",
          color: "rgba(0, 0, 0, 0.6)",
          callback: function (value) {
            return "";
          },
        },
        pointLabels: { font: { size: 10 }, color: "rgba(0, 0, 0, 0.8)" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.r !== null) label += context.parsed.r + " pts";
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const renderBadge = () => {
    if (!gamification) return null;
    const badgeProps = {
      className: `mx-auto mb-4 h-28 w-auto ${
        animateBadge ? "animate-bounce-badge" : ""
      }`,
    };
    switch (gamification.badge) {
      case "star":
        return <RisingStarBadge {...badgeProps} />;
      case "mentor":
        return <SavvyMentorBadge {...badgeProps} />;
      case "advocate":
        return <SimonsAdvocateBadge {...badgeProps} />;
      default:
        return (
          <div className="flex items-center justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Badge"
              className="w-24 h-auto"
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header title="Score" showMenuButton={true} />

      <div className="flex-1 px-4 py-6 max-w-xl mx-auto w-full">
        {gamification && (gamification.threshold > 0 || gamification.badge === 'advocate') && (
          <div
            ref={gamificationCardRef}
            className="relative bg-white p-6 rounded-lg shadow border border-amber-200 mb-8 text-center overflow-hidden"
          >
            {gamification.badge === "advocate" && confettiSize.width > 0 && (
              <ReactConfetti
                width={confettiSize.width}
                height={confettiSize.height}
                recycle={true}
                numberOfPieces={150}
                gravity={0.1}
                initialVelocityY={15}
                style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
              />
            )}
            <div className="relative z-10">
              <h2 className="text-lg font-bold text-amber-600 mb-2">
                {gamification.badge === 'advocate' ? "Congratulations!" : `Congratulations you achieved ${gamification.threshold} points!`}
              </h2>
              {renderBadge()}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {gamification.title}
              </h3>
              <p className="text-sm text-gray-600">{gamification.message}</p>
            </div>
          </div>
        )}

        {(!gamification || (gamification.threshold === 0 && gamification.badge !== 'advocate')) && (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="SimONS Logo"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to SimONS!
            </h3>
            <p className="text-sm text-gray-600">
              Complete exercises to start earning points and unlock achievements
            </p>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Total score</p>
          <p className="text-4xl font-bold text-gray-800">
            {scores.totalScore} points
          </p>
          <p className="text-xs text-gray-400">
            out of {scores.maxPossibleScore || 48650} possible points
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round(
                  (scores.totalScore / (scores.maxPossibleScore || 48650)) * 100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-8 h-64 md:h-80">
          <Radar data={chartData} options={chartOptions} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Competence areas
          </h3>
          <div className="space-y-3">
            {scores.areaScores.map((area, areaIndex) => {
              const isExpanded = expandedCategories[area.id];
              const subCompetences = getSubCompetencesForArea(area.id);
              const progressPercentage = getProgressPercentage(
                area.competenceDetails
              );
              const levelDisplay = getAreaLevelDisplay(area, completedLevels, latestGrades);

              return (
                <div
                  key={area.id}
                  className="rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(area.id)}
                    className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center flex-1 mr-4">
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
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      {isExpanded ? (
                        <FaChevronUp className="text-gray-600 w-4 h-4" />
                      ) : (
                        <FaChevronDown className="text-gray-600 w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pt-2 pb-4 bg-amber-50 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-600 mb-3 mt-2">
                        Competences:
                      </h4>
                      <ul className="space-y-2">
                        {subCompetences.map((sub, subIndex) => {
                          const competenceDetail =
                            area.competenceDetails?.[subIndex];
                          const subScore = competenceDetail?.score || 0;
                          const maxSubScore = 300;

                          const competenceNumber =
                            scores.areaScores
                              .slice(0, areaIndex)
                              .reduce(
                                (total, prevArea) =>
                                  total +
                                  getSubCompetencesForArea(prevArea.id).length,
                                0
                              ) +
                            subIndex +
                            1;

                          const quizProgress =
                            competenceDetail?.quizProgress || {
                              level1: false,
                              level2: false,
                            };
                          const completedLevels =
                            (quizProgress.level1 ? 1 : 0) +
                            (quizProgress.level2 ? 1 : 0);
                          const progressPercent = (completedLevels / 2) * 100;

                          return (
                            <li
                              key={sub.point}
                              className="flex justify-between items-center text-sm pl-2 pr-1 py-2 bg-white rounded border border-gray-100"
                            >
                              <div className="flex-1 mr-2">
                                <span className="text-gray-700 font-medium">
                                  {competenceNumber}. {sub.title}
                                </span>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-500">
                                    {subScore} points earned
                                  </span>
                                  <div className="w-16 bg-gray-200 rounded-full h-1">
                                    <div
                                      className="bg-amber-500 h-1 rounded-full"
                                      style={{ width: `${progressPercent}%` }}
                                    ></div>
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

        {scores.milestones && scores.milestones.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🏆 Milestones Achieved
            </h3>
            <div className="space-y-2">
              {scores.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-green-50 rounded"
                >
                  <div>
                    <span className="font-medium text-green-800">
                      {milestone.title}
                    </span>
                    <p className="text-xs text-green-600">
                      {milestone.description}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-700">
                    {milestone.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
      <style jsx global>{`
        @keyframes bounce-badge {
          0%,
          100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-badge {
          animation: bounce-badge 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default ScoreScreen;
