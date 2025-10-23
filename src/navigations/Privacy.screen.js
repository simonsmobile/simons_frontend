import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

const PrivacyScreen = () => {
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
            {t('privacy_policy')}
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t('privacy_policy')}
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>{t("privacy.intro")}</p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.data_collected")}
            </h3>
            <p>
              <ul>
                <li>
                  {t("privacy.content.data_collected.p1")}
                </li>
                <li>
                  {t("privacy.content.data_collected.p2")}
                </li>
              </ul>
            </p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.data_usage")}
            </h3>
            <p>
              <ul>
                <li>
                  {t("privacy.content.data_usage.p1")}
                </li>
                <li>
                  {t("privacy.content.data_usage.p2")}
                </li>
                <li>
                  {t("privacy.content.data_usage.p3")}
                </li>
                <li>
                  {t("privacy.content.data_usage.p4")}
                </li>
              </ul>
            </p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.data_sharing")}
            </h3>
            <p>
              {t("privacy.intro.data_sharing")}
              <ul>
                <li>
                  {t("privacy.content.data_sharing.p1")}
                </li>
                <li>
                  {t("privacy.content.data_sharing.p2")}
                </li>
              </ul>
            </p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.data_security")}
            </h3>
            <p>
              {t("privacy.content.data_security.p1")}
            </p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.data_retention")}
            </h3>
            <p>
              {t("privacy.content.data_retention.p1")}
            </p>

            <h3 className="font-semibold text-gray-800">
              {t("privacy.title.user_rights")}
            </h3>
            <p>
              {t("privacy.intro.user_rights")}
              <ul>
                <li>
                  {t("privacy.content.user_rights.p1")}
                </li>
                <li>
                  {t("privacy.content.user_rights.p2")}
                </li>
                <li>
                  {t("privacy.content.user_rights.p3")}
                </li>
              </ul>
            </p>
            <h3 className="font-semibold text-gray-800">
              {t("privacy.title_contact")}
            </h3>
            <p>
              SIMOnS – Student Improvement and Monitoring of Online Skills<br />
              <a
                href="https://www.simonsproject.eu"
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
                https://www.simonsproject.eu
              </a>
              
                <a
                href="mailto:info@simonsproject.eu"
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
                info@simonsproject.eu
              </a>
            </p>
            <p>
              {t('privacy.contact_us')}
            </p>
            <p><strong>{t('privacy.approval')}</strong></p>
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
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
