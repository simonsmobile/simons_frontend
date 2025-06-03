// navigations/StudyMaterials.screen.js - Fixed to properly load learning materials
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import env from "../configs/env";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import ReactPlayer from "react-player";

const StudyMaterialsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { index, level, category, sub, grade } = location.state || {};

  const subCategoryIdentifier = sub?.category;

  // Fix the level identifier mapping
  const currentLevelIdentifier = level === "basic" ? "basic" : "master";

  const getMaterial = (material, levelId, typeId) => {
    if (!material || !Array.isArray(material)) {
      console.warn("LEARNING_MATERIAL is not available or not an array");
      return null;
    }

    const found = material.find((q) => {
      const levelMatch = q.level === levelId;
      const typeMatch = q.type === typeId;
      return levelMatch && typeMatch;
    });

    return found || null;
  };

  const [learning_material] = useState(() => {
    if (!env.LEARNING_MATERIAL) {
      console.error("env.LEARNING_MATERIAL is not defined");
      return null;
    }

    return getMaterial(
      env.LEARNING_MATERIAL,
      currentLevelIdentifier,
      subCategoryIdentifier
    );
  });

  const videoSrc = subCategoryIdentifier
    ? `${process.env.PUBLIC_URL}/videos/${subCategoryIdentifier}-${currentLevelIdentifier}.mp4`
    : null;
  const urls = learning_material?.links || [];
  const textContent =
    learning_material?.text || "No description available for this section.";
  const displayLevel = level === "basic" ? "Level 1" : "Level 2";
  const displayTitle = category || "Study Material";
  const subTitle = sub ? `${sub.title}` : "";

  const handleTakeTest = () => {
    navigate("/sub-quest", { state: { index, level, category, sub, grade } });
  };

  const isEligible = () => {
    if (level === "basic") return true;
    if (level === "master") {
      if (!grade) return true;
      return grade === "M" || grade === "C" || grade === "B";
    }
    return true;
  };

  if (!isEligible()) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 w-full">
          <div className="flex items-center max-w-3xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-gray-800 p-1">
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold">Access Denied</h1>
            </div>
            <div className="w-6"></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-amber-600 mb-6 font-medium">
            You need to complete Level 1 exercises before accessing Level 2
            materials and quizzes for this competence.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-gray-800 p-1">
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold leading-tight">
              {displayTitle}
            </h1>
            <p className="text-xs text-gray-500">{subTitle}</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
              {displayLevel}
            </span>
          </div>

          {videoSrc ? (
            <div className="relative pt-[56.25%] mb-6 bg-black rounded-lg overflow-hidden shadow-lg border border-gray-300">
              <ReactPlayer
                url={videoSrc}
                className="absolute top-0 left-0 bg-white"
                controls={true}
                width="100%"
                height="100%"
                playing={false}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      disablePictureInPicture: false,
                      poster: `${process.env.PUBLIC_URL}/images/logo.png`,
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg mb-6 aspect-video flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p>Video not available for this section.</p>
                <p className="text-xs mt-1">
                  Expected: {subCategoryIdentifier}-{displayLevel}.mp4
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors duration-300 text-sm"
            >
              <FaChevronLeft className="mr-2" />
              Return to Dashboard
            </button>
            <button
              onClick={handleTakeTest}
              className="flex items-center justify-center px-4 py-3 bg-amber-400 text-black font-medium rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300 text-sm"
            >
              <MdOutlineQuiz className="mr-2 text-lg" />
              Take the Quiz
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Learning Materials
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <p>{textContent}</p>
            </div>
          </div>

          {urls?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Additional Resources
              </h3>
              <ul className="space-y-2">
                {urls.map((url, idx) => (
                  <li key={idx}>
                    <a
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline hover:text-blue-800 flex items-center group"
                    >
                      <svg
                        className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400 group-hover:text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      {url.target}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsScreen;
