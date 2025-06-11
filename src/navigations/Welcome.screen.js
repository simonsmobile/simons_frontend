import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [redirectRoute, setRedirectRoute] = useState("/landing");

  useEffect(() => {
    const changeRoute = () => {
      if (localStorage.getItem("username")) {
        if (localStorage.getItem("passed") === "Passed") {
          setRedirectRoute("/dashboard");
          navigate("/dashboard");
        } else {
          setRedirectRoute("/quest-begin");
          navigate("/quest-begin");
        }
      }
    };
    changeRoute();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="relative mb-8">
          <div className="absolute top-0 right-0 w-3/4 h-40 bg-amber-300 rounded-bl-full -z-10"></div>

          <div className="flex justify-center pt-12">
            <div className="bg-white rounded-full p-3 shadow-md">
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="SIMOnS Logo"
                className="h-24 w-24"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to SIMOnS
          </h1>
          <p className="text-gray-600 px-6">
            Student Improvement and Monitoring of Online Skills
          </p>
          <p className="text-sm text-gray-500 mt-3 px-6">
            A self-reflection tool for the European Digital Competence Framework
            for Citizens
          </p>
        </div>
      </div>

      <div className="w-full max-w-md px-6 mb-8 relative">
        <div className="absolute left-0 bottom-24 w-12 h-12 bg-amber-200 rounded-full opacity-50 -z-10"></div>
        <div className="absolute right-10 bottom-48 w-8 h-8 bg-amber-300 rounded-full opacity-50 -z-10"></div>

        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="w-full py-3 bg-black text-white font-medium rounded-md text-center shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
          >
            <span>Login</span>
          </Link>
          <Link
            to="/create-account"
            className="w-full py-3 bg-white text-black font-medium rounded-md text-center border border-black shadow-md hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
          >
            <span>Register</span>
          </Link>
        </div>

        <div className="w-full mt-8">
          <div className="flex flex-wrap justify-center items-center gap-3 px-4">
            <img
              src={`${process.env.PUBLIC_URL}/images/eu.png`}
              alt="University of Maia"
              className="h-8 opacity-80"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/uni_maia.png`}
              alt="University of Maia"
              className="h-8 opacity-80"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/uni_campania.png`}
              alt="Università degli Studi della Campania"
              className="h-8 opacity-80"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/uni_finland.png`}
              alt="University of Eastern Finland"
              className="h-8 opacity-80"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/uni_vilnius.png`}
              alt="Vilnius College"
              className="h-8 opacity-80"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/uni_patras.png`}
              alt="University of Patras"
              className="h-8 opacity-80"
            />
          </div>
          <p className="text-center text-xs text-gray-500 mt-3 mb-2">
            www.simonsproject.eu
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
