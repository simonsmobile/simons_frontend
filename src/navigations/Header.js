import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../configs/Firebase";
import { signOut } from "firebase/auth";

const Header = ({ title, showMenuButton = false, showSimonsText = false }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setShowMenu(false);
    localStorage.removeItem("username");
    localStorage.removeItem("passed");
    localStorage.removeItem("answers");
    localStorage.removeItem("completedCategories");
    for (let i = 1; i <= 5; i++) {
      localStorage.removeItem(`category_answers_${i}`);
    }
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const button = document.getElementById(
        `header-dashboard-button-${title?.replace(/\s+/g, "-")}`
      );
      if (button && button.contains(event.target)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenuButton) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenuButton, title]);

  return (
    <header className="bg-white text-gray-800 shadow-sm sticky top-0 z-20">
      <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center relative">
        <div className="flex items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/resize-logo.png`}
            alt="SIMOnS Logo"
            className="h-8 w-auto mr-2"
          />
          {!showSimonsText && title && (
            <h1 className="text-lg font-semibold text-center flex-1 absolute left-1/2 transform -translate-x-1/2">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center">
          {showMenuButton ? (
            <button
              id={`header-dashboard-button-${title?.replace(/\s+/g, "-")}`}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <FaEllipsisV className="text-gray-600 h-5 w-5" />
            </button>
          ) : (
            <div className="w-8 h-8"></div>
          )}
        </div>

        {showMenuButton && showMenu && (
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
  );
};

export default Header;
