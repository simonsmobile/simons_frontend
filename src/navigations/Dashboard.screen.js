import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaChevronDown, FaChevronUp, FaCheck, FaLock, FaDoorOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const [competencies] = useState([
    { id: 0, category: '1.1', title: 'Browsing, searching and filtering data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id: 1, category: '1.2', title: 'Evaluating data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id: 2, category: '1.3', title: 'Managing data, information and digital content', mainCategory: 'Information & Data Literacy' },
    { id: 3, category: '2.1', title: 'Interacting through digital technologies', mainCategory: 'Communication & Collaboration' },
    { id: 4, category: '2.2', title: 'Sharing information and content through digital technologies', mainCategory: 'Communication & Collaboration' },
    { id: 5, category: '2.3', title: 'Engaging in citizenship through digital technologies', mainCategory: 'Communication & Collaboration' },
    { id: 6, category: '2.4', title: 'Collaborating through digital technologies', mainCategory: 'Communication & Collaboration' },
    { id: 7, category: '2.5', title: 'Netiquette', mainCategory: 'Communication & Collaboration' },
    { id: 8, category: '2.6', title: 'Managing digital identity', mainCategory: 'Communication & Collaboration' },
    { id: 9, category: '3.1', title: 'Developing digital content', mainCategory: 'Digital Content Creation' },
    { id: 10, category: '3.2', title: 'Integrating and re-elaborating digital content', mainCategory: 'Digital Content Creation' },
    { id: 11, category: '3.3', title: 'Copyright and licenses', mainCategory: 'Digital Content Creation' },
    { id: 12, category: '3.4', title: 'Programming', mainCategory: 'Digital Content Creation' },
    { id: 13, category: '4.1', title: 'Protecting devices', mainCategory: 'Safety' },
    { id: 14, category: '4.2', title: 'Protecting personal data and privacy', mainCategory: 'Safety' },
    { id: 15, category: '4.3', title: 'Protecting health and well-being', mainCategory: 'Safety' },
    { id: 16, category: '4.4', title: 'Protecting the environment', mainCategory: 'Safety' },
    { id: 17, category: '5.1', title: 'Solving technical problems', mainCategory: 'Problem Solving' },
    { id: 18, category: '5.2', title: 'Identifying needs and technological responses', mainCategory: 'Problem Solving' },
    { id: 19, category: '5.3', title: 'Creatively using digital technologies', mainCategory: 'Problem Solving' },
    { id: 20, category: '5.4', title: 'Identifying digital competence gaps', mainCategory: 'Problem Solving' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const navigateToStudy = (index, level, category, sub) => {
    navigate('/study', { state: { index, level, category, sub } });
  };

  const calculateCategoryScores = () => {
    const scores = userData.categories.map((category, index) => {
      const categoryCompetencies = competencies.filter(
        comp => comp.mainCategory === category
      );
      
      const achievedAdvanced = categoryCompetencies.filter(comp => 
        userData.progressResults[comp.id] === 'M' || userData.progressResults[comp.id] === 'C'
      ).length;
      
      return {
        category,
        score: categoryCompetencies.length > 0 
          ? (achievedAdvanced / categoryCompetencies.length) * 100 
          : 0
      };
    });
    
    return scores;
  };

  const categoryScores = calculateCategoryScores();

  const getCompetenceStatusIcon = (result) => {
    if (result === 'C') return <FaCheck className="text-green-600" />;
    if (result === 'M') return <FaDoorOpen className="text-blue-600" />;
    if (result === 'B') return <FaDoorOpen className="text-gray-600" />;
    return <FaLock className="text-red-500" />;
  };

  const getCompetenceLevel = (result) => {
    if (result === 'C') return "Advanced";
    if (result === 'M') return "Intermediate";
    if (result === 'B') return "Foundation";
    return "Not achieved";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-black text-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">SIMOnS</h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center px-3 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-t-accent border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {userData.name}</h2>
              <p className="text-gray-600">Your digital competence dashboard</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8 flex items-center">
              <div className="mr-4">
                <img src={`${process.env.PUBLIC_URL}/images/badge.png`} alt="Trophy" className="h-16 w-16" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-600">2300 points</h3>
                <p className="text-sm text-gray-600">Your current achievement score</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Competence Overview</h3>
              
              <div className="space-y-4">
                {categoryScores.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm text-gray-600">{Math.round(item.score)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-accent h-2.5 rounded-full" 
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b border-gray-200">
                Competence Areas
              </h3>
              
              <div className="divide-y divide-gray-200">
                {userData.categories.map((category, index) => (
                  <div key={index}>
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => handleCategoryClick(index)}
                    >
                      <span className="font-medium text-gray-800">{category}</span>
                      {expandedCategory === index ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    
                    {expandedCategory === index && (
                      <div className="px-4 py-3 bg-gray-50">
                        <ul className="divide-y divide-gray-200">
                          {competencies
                            .filter(comp => comp.mainCategory === category)
                            .map((comp) => (
                              <li key={comp.id} className="py-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">{comp.category} {comp.title}</p>
                                    <p className="text-xs text-gray-600">
                                      Level: {getCompetenceLevel(userData.progressResults[comp.id])}
                                    </p>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => navigateToStudy(index, 'basic', category, comp)}
                                      className="w-8 h-8 mr-2 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                      title="Foundation Level"
                                    >
                                      {userData.progressResults[comp.id] === 'B' || 
                                       userData.progressResults[comp.id] === 'M' || 
                                       userData.progressResults[comp.id] === 'C' 
                                        ? <FaDoorOpen className="text-gray-600" /> 
                                        : <FaLock className="text-gray-600" />}
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        if (userData.progressResults[comp.id] === 'M' || 
                                            userData.progressResults[comp.id] === 'C') {
                                          navigateToStudy(index, 'master', category, comp);
                                        }
                                      }}
                                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        userData.progressResults[comp.id] === 'M' || 
                                        userData.progressResults[comp.id] === 'C' 
                                          ? 'bg-amber-100 hover:bg-amber-200' 
                                          : 'bg-gray-200 cursor-not-allowed'
                                      } transition-colors`}
                                      title="Advanced Level"
                                      disabled={!(userData.progressResults[comp.id] === 'M' || userData.progressResults[comp.id] === 'C')}
                                    >
                                      {userData.progressResults[comp.id] === 'C' 
                                        ? <FaCheck className="text-green-600" /> 
                                        : userData.progressResults[comp.id] === 'M' 
                                          ? <FaDoorOpen className="text-amber-600" /> 
                                          : <FaLock className="text-gray-400" />}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/quest-begin"
                className="inline-block px-6 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
              >
                Take Assessment Again
              </Link>
            </div>
          </>
        )}
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around">
            <Link 
              to="/dashboard" 
              className="flex flex-col items-center py-2 px-3 text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Home</span>
            </Link>
            
            <Link 
              to="/quest-begin" 
              className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs">Survey</span>
            </Link>
            
            <button 
              className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-accent"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs">Logout</span>
            </button>
          </div>
        </div>
      </nav>
      
      <div className="h-16"></div>
    </div>
  );
};

export default DashboardScreen;