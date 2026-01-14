import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// translations
import en from "./en.json";
import hi from "./hi.json";
import es from "./es.json";
import fr from "./fr.json";

i18n
  .use(LanguageDetector) // detect language from browser / localStorage
  .use(initReactI18next) // connect with react

  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      es: { translation: es },
      fr: { translation: fr },
    },

    fallbackLng: "en", // if language missing
    supportedLngs: ["en", "hi", "es", "fr"],

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
