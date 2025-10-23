import React, { useEffect, useState } from "react";
import { FaTrophy, FaMedal, FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import Header from "./Header";
import { useToast } from "../hooks/useToast";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const RankScreen = () => {
  const toast = useToast();
    const { t, i18n } = useTranslation();
    const [leaderboardData, setLeaderboardData] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unlockedAvatars, setUnlockedAvatars] = useState([]);

  const avatars = [
    {
      id: 1,
      name: t('bronze'), 
      threshold: 10000,
      emoji: "🥉",
      color: "bg-orange-100 border-orange-300",
    },
    {
      id: 2,
      name: t('silver'),
      threshold: 20000,
      emoji: "🥈",
      color: "bg-gray-100 border-gray-300",
    },
    {
      id: 3,
      name: t('gold'),
      threshold: 30000,
      emoji: "🥇",
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: 4,
      name: t('diamond'),
      threshold: 40000,
      emoji: "💎",
      color: "bg-blue-100 border-blue-300",
    },
  ];

  useEffect(() => {
    fetchData();
    loadAvatarData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");

      const leaderboardResponse = await axios.get(
        `${env.SERVER_URL}/auth/leaderboard/${username}`
      );
      setLeaderboardData(leaderboardResponse.data);

      const scoreResponse = await axios.get(
        `${env.SERVER_URL}/auth/student/${username}/new_tests`
      );
      setUserScore(scoreResponse.data.totalScore || 0);
    } catch (error) {
      console.error("Error fetching rank data:", error);
      toast.error("Failed to load ranking data");
    } finally {
      setLoading(false);
    }
  };

  const loadAvatarData = () => {
    const saved = localStorage.getItem("unlockedAvatars");
    if (saved) {
      setUnlockedAvatars(JSON.parse(saved));
    }
  };

  const unlockAvatar = (avatarId) => {
    const avatar = avatars.find((a) => a.id === avatarId);
    if (userScore >= avatar.threshold && !unlockedAvatars.includes(avatarId)) {
      const newUnlocked = [...unlockedAvatars, avatarId];
      setUnlockedAvatars(newUnlocked);
      localStorage.setItem("unlockedAvatars", JSON.stringify(newUnlocked));

      localStorage.setItem("currentAvatar", JSON.stringify(avatar));

      toast.success(`${avatar.name} avatar unlocked!`);
    }
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <FaTrophy className="text-yellow-500" />;
    if (position === 2) return <FaMedal className="text-gray-400" />;
    if (position === 3) return <FaMedal className="text-orange-400" />;
    return <span className="font-bold text-gray-600">#{position}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header title="Rank" showMenuButton={true} />

      <main className="flex-1 max-w-xl mx-auto px-4 py-6 w-full">
        {/* Leaderboard Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
          <div className="flex items-center mb-4">
            <FaTrophy className="text-amber-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">{t('leaderboard')}</h2>
          </div>

          {leaderboardData && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 text-center">
                {t('your_rank')}:{" "}
                <span className="font-bold text-amber-600">
                  #{leaderboardData.userRank}
                </span>{" "}
                {/* out of {leaderboardData.totalUsers} users */}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {leaderboardData?.leaderboard.map((user, index) => {
              const position = leaderboardData.leaderboard
                .slice(0, 5)
                .includes(user)
                ? index + 1
                : leaderboardData.userRank;

              return (
                <div
                  key={user.email}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    user.isCurrentUser
                      ? "bg-amber-50 border-2 border-amber-300"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      {getPositionIcon(position)}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          user.isCurrentUser
                            ? "text-amber-700"
                            : "text-gray-800"
                        }`}
                      >
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="ml-2 text-xs text-amber-600">
                            ({t('you')})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{t('rank')} #{position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Avatars Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-2">🎭</div>
            <h2 className="text-xl font-bold text-gray-900">{t('avatars')}</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {t('unlock_avatars')}{" "}
            <span className="font-bold text-amber-600">
              {t('avatar_points', {user_score: userScore})}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            {avatars.map((avatar) => {
              const isUnlocked = unlockedAvatars.includes(avatar.id);
              const canUnlock = userScore >= avatar.threshold && !isUnlocked;
              const scoresToGo = avatar.threshold - userScore;

              return (
                <div
                  key={avatar.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    avatar.color
                  } ${isUnlocked ? "ring-2 ring-green-400" : ""}`}
                >
                  <div className="text-4xl mb-2">{avatar.emoji}</div>
                  <h3 className="font-medium text-gray-800 text-sm mb-1">
                    {avatar.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {t('avatar_threshold', {avatarThreshold: avatar.threshold})}
                  </p>

                  {isUnlocked ? (
                    <div className="flex items-center justify-center text-green-600">
                      <FaUnlock className="mr-1" />
                      <span className="text-xs font-medium">{t('unlocked')}</span>
                    </div>
                  ) : canUnlock ? (
                    <button
                      onClick={() => unlockAvatar(avatar.id)}
                      className="w-full py-2 bg-amber-500 text-white text-xs font-medium rounded-md hover:bg-amber-600 transition-colors"
                    >
                      {t('unlock_now')}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center text-gray-400">
                      <FaLock className="mr-1" />
                      <span className="text-xs">
                        {t('you_still_need', { scoresToGo })}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default RankScreen;
