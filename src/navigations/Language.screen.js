import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const LanguageScreen = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
 // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const storedLanguage = localStorage.getItem("i18nextLng") || "en";
  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage);

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português (Portuguese)" },
    { code: "it", name: "Italiano (Italian)" },
    { code: "fi", name: "Suomi (Finnish)" },
    { code: "lt", name: "Lietuvių (Lithuanian)" },
    { code: "el", name: "Ελληνικά (Greek)" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    changeLanguage(event.target.value);
    console.log("Selected language:", event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-12">
        <div className="flex items-center">
          <button
            //onClick={() => navigate("/profile")}
            onClick={() => navigate(-1)}
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
            {t('lang_settings')}
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
           {t('select_lang')}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t('select_lang_message')}
          </p>

          <fieldset>
            <legend className="sr-only">Language selection</legend>
            <div className="space-y-3">
              {languages.map((lang) => (
                <label
                  key={lang.code}
                  htmlFor={`language-${lang.code}`}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedLanguage === lang.code
                      ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    id={`language-${lang.code}`}
                    name="language"
                    value={lang.code}
                    checked={selectedLanguage === lang.code}
                    onChange={handleLanguageChange}
                    className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-800">
                    {lang.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 text-sm"
            >
              {t('confirm_selection')}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full relative mt-auto">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default LanguageScreen;
