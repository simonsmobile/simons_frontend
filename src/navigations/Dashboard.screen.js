import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProgressTracker from './ProgresssTracker.screen';
import env from '../configs/env';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: localStorage.getItem("username"),
    status: 'Active',
    originalResults: [],
    progressResults: [],
    categories: [
      'Information & Data Literacy',
      'Communication & Collaboration',
      'Digital Content Creation',
      'Safety',
      'Problem Solving'
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${env.SERVER_URL}/auth/student/${localStorage.getItem('username')}/tests`);
        const data = await response.json();

        if (data) {
          const originalResults = data.firstTest?.grades || [];
          const progressResults = data.lastTest?.grades || originalResults;

          setUserData(prevData => ({
            ...prevData,
            originalResults,
            progressResults,
          }));
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="container-dash">
      <nav className="top-nav">
        <div className="logo">
          <h2>SIMOnS</h2>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt className="icon" />
            Log Out
          </button>
        </div>
      </nav>
      <div className="content">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">Welcome, {userData.name}</p>

        {/* <div className="results-container">
          <h3>Original Result</h3>
          <div className="result-row">
            {userData.originalResults.map((result, index) => (
              <div key={index} className="result-box">
                <span className="result-letter">{result}</span>
              </div>
            ))}
          </div>
          <div className="caption-row">
            {userData.categories.map((category, index) => (
              <div key={index} className="category-caption">
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="results-container">
          <h3>Progress Result</h3>
          <div className="result-row">
            {userData.progressResults.map((result, index) => (
              <div key={index} className="result-box">
                <span className="result-letter">{result}</span>
              </div>
            ))}
          </div>
          <div className="caption-row">
            {userData.categories.map((category, index) => (
              <div key={index} className="category-caption">
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* <ProgressTracker /> */}

        {/* <p className="signup-prompt">
          Attempt Survey Again <Link to="/quest-begin" className="signup-link">Here</Link>
        </p> */}

        <div className='results-container'>
            {userData&&<ProgressTracker results={userData.progressResults}/>}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
