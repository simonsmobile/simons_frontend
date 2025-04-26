import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../configs/env";
import BottomNav from "./BottomNav";
import {
  FaSignOutAlt,
  FaMoon,
  FaKey,
  FaGlobe,
  FaInfoCircle,
  FaFileContract,
  FaShieldAlt,
  FaShareAlt,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env.SERVER_URL}/auth/student/${localStorage.getItem("username")}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("passed");
    localStorage.removeItem("answers");
    localStorage.removeItem("completedCategories");
    // Remove category-specific answers if needed
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`category_answers_${i}`);
    }
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if userData fetch fails or is incomplete
  const displayName = userData
    ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
      localStorage.getItem("username")
    : localStorage.getItem("username");
  const displayEmail = userData?.email || localStorage.getItem("username");

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
            {/* Placeholder */}
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
          <h1 className="text-lg font-semibold text-center flex-1">Profile</h1>
          <button className="text-gray-800 invisible">
            {" "}
            {/* Options Placeholder */}
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
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 overflow-hidden">
              {/* Placeholder for profile picture */}
              <FaUserCircle className="w-full h-full text-gray-500" />
              {/* <img src={userData?.profilePicUrl || '/path/to/default-avatar.png'} alt="Profile" className="w-full h-full object-cover" /> */}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {displayName}
            </h2>
            <p className="text-sm text-gray-500">{displayEmail}</p>
          </div>

          {/* General Settings */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 px-4 mb-2">
              General Settings
            </h3>
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {/* Dark Mode - Placeholder */}
                <li className="px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaMoon className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Mode</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      Dark & Light
                    </span>
                    {/* Basic Toggle Placeholder */}
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        name="toggle"
                        id="toggle"
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"
                        disabled
                      />
                      <label
                        htmlFor="toggle"
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </li>
                {/* Change Password - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaKey className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Change Password</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                {/* Language - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaGlobe className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Language</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </ul>
            </div>
          </div>

          {/* Information */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 px-4 mb-2">
              Information
            </h3>
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {/* About App - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaInfoCircle className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">About App</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                {/* Terms & Conditions - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaFileContract className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Terms & Conditions</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                {/* Privacy Policy - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Privacy Policy</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                {/* Share This App - Placeholder Link */}
                <li className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <FaShareAlt className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Share This App</span>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              </ul>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
      {/* CSS for the toggle switch */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fbbf24; /* amber-300 */
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #fbbf24; /* amber-300 */
        }
      `}</style>
    </div>
  );
};

export default ProfileScreen;
