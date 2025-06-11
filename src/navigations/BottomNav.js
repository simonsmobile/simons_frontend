import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaUserCircle, FaThLarge } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { path: "/dashboard", icon: FaThLarge, label: "Dashboard" },
    { path: "/score", icon: FaChartBar, label: "Score" },
    { path: "/profile", icon: FaUserCircle, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <div className="max-w-xl mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center text-center w-1/4 transition-colors duration-200 ${
                isActive
                  ? "text-black font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {IconComponent ? (
                <IconComponent
                  className={`h-6 w-6 mb-1 ${isActive ? "text-amber-500" : ""}`}
                />
              ) : (
                item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className={`h-6 w-6 mb-1 object-contain ${
                      isActive
                        ? "filter brightness-110 saturate-150"
                        : "opacity-70"
                    }`}
                  />
                )
              )}
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
