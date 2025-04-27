import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import env from '../configs/env';
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";

const StudyMaterialsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { index, level, category, sub } = location.state || {};

  const handleReattempt = () => {
    navigate('/sub-quest', { state: { index, level, category, sub } });
  };

  const getMaterial = (material, level, type) => {
    const filteredMaterial = material.filter(
      (q) => q.level === level && q.type === type
    );

    return filteredMaterial;
  };

  const [learning_material, setMaterial] = useState(getMaterial(
    env.LEARNING_MATERIAL,
    level,
    sub?.category
  ));

  const urls = learning_material[0]?.links;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">Study Materials</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
              {level?.toLowerCase() === "basic" ? "Foundation / Intermediate" : "Advanced / Highly Specialized"}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{category}</h2>
            {sub && (
              <p className="text-gray-600">
                {sub?.category} - {sub.title}
              </p>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 relative aspect-video">
            <video
              controls
              className="w-full h-full object-cover"
              poster={`${process.env.PUBLIC_URL}/images/video-placeholder.jpg`}
            >
              <source src={`${process.env.PUBLIC_URL}/videos/${sub?.category}-${level}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Materials</h3>
            <div className="prose max-w-none text-gray-700">
              <p>{learning_material[0]?.text}</p>
            </div>
          </div>

          {urls?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
              <ul className="space-y-3">
                {urls.map((url, index) => (
                  <li key={index} className="flex">
                    <svg className="h-6 w-6 text-accent flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a 
                      href={url.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url.target}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/dashboard"
              className="flex items-center justify-center px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              <FaChevronLeft className="mr-2" />
              Return to Dashboard
            </Link>
            <button
              onClick={handleReattempt}
              className="flex items-center justify-center px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
            >
              <MdOutlineQuiz className="mr-2 text-lg" />
              Take the Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsScreen;