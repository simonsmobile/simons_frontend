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
  GRADE_POINTS_MAP,
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

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.SERVER_URL}/auth/student/${localStorage.getItem(
            "username"
          )}/tests`
        );
        const latestGrades = response.data?.lastTest?.grades || null;
        const calculated = calculateScores(latestGrades);
        setScores(calculated);
        const gameDetails = getGamificationDetails(calculated.totalScore);
        setGamification(gameDetails);
        if (gameDetails) {
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
        setScores(calculateScores(null));
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
    labels: scores.areaScores.map((area) => area.shortName),
    datasets: [
      {
        label: "Competence Score %",
        data: scores.areaScores.map((area) =>
          Math.round((area.score / area.maxScore) * 100)
        ),
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

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: "rgba(0, 0, 0, 0.1)" },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "rgba(0, 0, 0, 0.6)",
          callback: function (value) {
            return value + "%";
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
            if (context.parsed.r !== null) label += context.parsed.r + "%";
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
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header title="Score" showMenuButton={true} />

      <div className="flex-1 px-4 py-6 max-w-xl mx-auto w-full">
        {gamification && (
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
                Congratulations you achieved {gamification.threshold} points!
              </h2>
              {renderBadge()}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {gamification.title}
              </h3>
              <p className="text-sm text-gray-600">{gamification.message}</p>
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Total score</p>
          <p className="text-4xl font-bold text-gray-800">
            {scores.totalScore} points
          </p>
          <p className="text-xs text-gray-400">out of 3150 possible points</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-8 h-64 md:h-80">
          <Radar data={chartData} options={chartOptions} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Competence areas
          </h3>
          <div className="space-y-3">
            {scores.areaScores.map((area) => {
              const isExpanded = expandedCategories[area.id];
              const subCompetences = getSubCompetencesForArea(area.id);
              const percentage =
                area.maxScore > 0
                  ? Math.round((area.score / area.maxScore) * 100)
                  : 0;
              return (
                <div
                  key={area.id}
                  className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(area.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center flex-1 mr-4">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {area.level}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{area.name}</p>
                        <p className="text-sm text-gray-500">{percentage}%</p>
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mx-4 flex-1 min-w-[80px] max-w-[100px]">
                        <div
                          className="bg-amber-400 h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {isExpanded ? (
                        <FaChevronUp className="text-gray-400 w-4 h-4" />
                      ) : (
                        <FaChevronDown className="text-gray-400 w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pt-2 pb-4 bg-gray-50 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-600 mb-3 mt-2">
                        Sub-competences:
                      </h4>
                      <ul className="space-y-2">
                        {subCompetences.map((sub) => {
                          const grade =
                            scores.competenceLevels?.[sub.point] || "F";
                          const subScore = GRADE_POINTS_MAP[grade] || 0;
                          const maxSubScore = GRADE_POINTS_MAP["C"];

                          return (
                            <li
                              key={sub.point}
                              className="flex justify-between items-center text-sm pl-2 pr-1 py-1 border-b border-gray-100 last:border-b-0"
                            >
                              <span className="text-gray-700 flex-1 mr-2">
                                {sub.point} {sub.title}
                              </span>
                              <span className="font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-xs whitespace-nowrap">
                                {subScore} / {maxSubScore} pts
                              </span>
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
          /* Apply animation for 5s only via state was tricky,
              so infinite bounce is used. Control via state adds complexity */
        }
      `}</style>
    </div>
  );
};

export default ScoreScreen;
