import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import {
  calculateScores,
  getGamificationDetails,
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ScoreScreen = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gamification, setGamification] = useState(null);

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
        setGamification(getGamificationDetails(calculated.totalScore));
      } catch (error) {
        console.error("Error fetching scores:", error);
        setScores(calculateScores(null));
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
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
        label: "Competence Score",
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

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: "rgba(0, 0, 0, 0.1)" },
        suggestedMin: 0,
        suggestedMax: 150,
        ticks: {
          stepSize: 30,
          backdropColor: "transparent",
          color: "rgba(0, 0, 0, 0.6)",
        },
        pointLabels: {
          font: {
            size: 10,
          },
          color: "rgba(0, 0, 0, 0.8)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.r !== null) {
              label += context.parsed.r + " / 150";
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const getBadgeImage = (badgeName) => {
    // Assuming you have images named star.png, mentor.png, advocate.png in public/images/badges
    if (!badgeName) return null;
    return `${process.env.PUBLIC_URL}/images/badges/${badgeName}.png`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 invisible"
          >
            {" "}
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
          <h1 className="text-lg font-semibold text-center flex-1">Score</h1>
          <button className="text-gray-800">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Gamification Badge Display */}
          {gamification && (
            <div className="bg-white p-6 rounded-lg shadow border border-amber-200 mb-8 text-center">
              <h2 className="text-lg font-bold text-amber-600 mb-2">
                Congratulations you achieved {gamification.threshold} points!
              </h2>
              <img
                src={getBadgeImage(gamification.badge)}
                alt={gamification.title}
                className="mx-auto mb-4 h-24 w-auto"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {gamification.title}
              </h3>
              <p className="text-sm text-gray-600">{gamification.message}</p>
            </div>
          )}

          {/* Total Score */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Total score</p>
            <p className="text-4xl font-bold text-gray-800">
              {scores.totalScore} points
            </p>
            {/* Max possible score: 21 sub-competences * 150 points/sub-competence = 3150 */}
            <p className="text-xs text-gray-400">out of 3150 possible points</p>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-8 h-64 md:h-80">
            <Radar data={chartData} options={chartOptions} />
          </div>

          {/* Competence Areas List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Competence areas
            </h3>
            <div className="space-y-3">
              {scores.areaScores.map((area) => (
                <div
                  key={area.id}
                  className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center"
                >
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {area.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{area.name}</p>
                    <p className="text-sm text-gray-500">
                      {area.score} / {area.maxScore} points
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4 flex-1 max-w-[100px]">
                    <div
                      className="bg-amber-400 h-2.5 rounded-full"
                      style={{
                        width: `${(area.score / area.maxScore) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ScoreScreen;
