// src/i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
  // Use backend plugin for loading translations asynchronously.
  .use(Backend)
  // Detect user language automatically.
  .use(LanguageDetector)
  // Bind react-i18next to the i18next instance.
  .use(initReactI18next)
  .init({
    // Fallback language in case detection fails.
    fallbackLng: 'en',

    supportedLngs: ['en','fi','pt','lt','el','it'],
    load: 'currentOnly',              // 'en-US' -> 'en'
    nonExplicitSupportedLngs: true,   // hyväksy 'en-*' kun 'en' on tuettu
    lowerCaseLng: true,               // normalisoi (esim. 'EN-us' -> 'en-us')
    cleanCode: true,                  // siistii koodin (en-US -> en-US, fi-FI -> fi-FI)
    returnNull: false,

    ns: ["ui", "questions", "assessment"],         // käytössä olevat namespaces
    defaultNS: "ui",               // oletus jos et anna erikseen
    // Configuration for your backend (adjust the path according to your folder structure).
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring','localStorage','navigator','htmlTag','path','subdomain'],
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },

    // Debugging can be enabled during development.
    debug: process.env.NODE_ENV === 'development',

    // Interpolation settings (ensure values are not escaped to allow proper rendering).
    interpolation: {
      escapeValue: false, // React already does escaping.
      format: (value, format, lng) => {
        if (format === "number") {
          return new Intl.NumberFormat(lng).format(value);
        }
        return value;
      }
    },

    // React-specific options
    react: {
      useSuspense: true,
    },

    // Optional: Namespace settings if your project is large.
   // ns: ['translation'],
   // defaultNS: 'translation',
  });

export default i18next;
