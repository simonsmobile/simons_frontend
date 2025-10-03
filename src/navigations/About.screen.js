import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const AboutScreen = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-12">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/profile")}
            className="text-gray-800"
          >
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
          <h1 className="text-lg font-semibold text-center flex-1">
            {t('about_simons_app')}
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t('about_the_app')}
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 text-sm"
            >
              {t('back_to_profile')}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full relative mt-auto">
        {" "}
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default AboutScreen;
