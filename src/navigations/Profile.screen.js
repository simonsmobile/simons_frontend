import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import Header from "./Header";
import { auth } from "../configs/Firebase";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized
import {
  FaSignOutAlt,
  FaMoon,
  FaKey,
  FaGlobe,
  FaInfoCircle,
  FaFileContract,
  FaShieldAlt,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    const savedAvatar = localStorage.getItem("currentAvatar");
    if (savedAvatar) {
      setCurrentAvatar(JSON.parse(savedAvatar));
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem("username");
        if (username) {
          const response = await axios.get(
            `${env.SERVER_URL}/auth/student/${username}`
          );
          setUserData(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("passed");
    localStorage.removeItem("answers");
    localStorage.removeItem("completedCategories");
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`category_answers_${i}`);
    }
    auth.signOut().catch((error) => console.error("Sign out error", error));
    navigate("/login");
  };

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}` || "?";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  const displayName = userData
    ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
      localStorage.getItem("username")?.split("@")[0] ||
      "User"
    : localStorage.getItem("username")?.split("@")[0] || "User";
  const displayEmail =
    userData?.email || localStorage.getItem("username") || "";
  const initials = getInitials(userData?.firstName, userData?.lastName);
  const photoURL = currentUser?.photoURL || null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <Header title="Profile" showMenuButton={false} />

      <div className="flex-1 px-4 py-6 max-w-xl mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4 overflow-hidden border-2 border-amber-300 text-amber-700">
            {currentAvatar ? (
              <span className="text-4xl">{currentAvatar.emoji}</span>
            ) : photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : initials !== "?" ? (
              <span className="text-4xl font-semibold">{initials}</span>
            ) : (
              <FaUserCircle className="w-16 h-16 text-amber-400" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{displayName}</h2>
          <p className="text-sm text-gray-500">{displayEmail}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-gray-500 px-4 mb-2">
            {t('general_settings')}
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              <Link to="/forgot-password" className="block hover:bg-gray-50">
                <li className="px-4 py-3 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center">
                    <FaKey className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{t('change_password')}</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </Link>
              <Link to="/language-settings" className="block hover:bg-gray-50">
                <li className="px-4 py-3 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center">
                    <FaGlobe className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{t('language')}</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase text-gray-500 px-4 mb-2">
            {t('app_information')}
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              <Link to="/about" className="block hover:bg-gray-50">
                <li className="px-4 py-3 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center">
                    <FaInfoCircle className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{t('about_app')}</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </Link>
              <Link to="/terms" className="block hover:bg-gray-50">
                <li className="px-4 py-3 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center">
                    <FaFileContract className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{t('terms')}</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </Link>
              <Link to="/privacy" className="block hover:bg-gray-50">
                <li className="px-4 py-3 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{t('privacy_policy')}</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 text-sm bg-amber-600 text-white font-medium rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300 flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" />
          {t('logout')}
        </button>
      </div>

      <BottomNav />
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fbbf24;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #fbbf24;
        }
      `}</style>
    </div>
  );
};

export default ProfileScreen;
