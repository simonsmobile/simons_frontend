import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const history = useNavigate();
  const [redirectRoute, setRedirectRoute] = useState('/landing');

  useEffect(() => {
    const changeRoute = () => {
      if (localStorage.getItem('username')) {
        if (localStorage.getItem('passed') === "Passed") {
          setRedirectRoute('/dashboard');
          history('/dashboard')
        } else {
          setRedirectRoute('/quest-begin');
          history('/quest-begin')
        }
      }
    };
    changeRoute();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img 
            src={`${process.env.PUBLIC_URL}/images/Picturec.png`} 
            alt="SIMOnS Logo" 
            className="h-20"
          />
        </div>

        <div className="flex justify-center mb-8">
          <img 
            src={`${process.env.PUBLIC_URL}/images/start.png`} 
            alt="Welcome" 
            className="w-full max-w-xs"
          />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-primary mb-2">
            SIMOnS Mobile
          </h1>
          <p className="text-gray-600 text-sm px-6">
            A Self-reflection Tool for the European Digital Competence Framework for Citizens
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-md px-6 mb-8">
        <div className="flex flex-col space-y-4">
          <Link 
            to="/login" 
            className="w-full py-3 bg-black text-white font-medium rounded-md text-center shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            Login
          </Link>
          <Link 
            to="/create-account" 
            className="w-full py-3 bg-white text-black font-medium rounded-md text-center border border-black shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;