import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnText from "./translation/en.json";
import KoText from "./translation/ko.json";

const resources = {
  en: { translation: EnText },
  ko: { translation: KoText },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  keySeparator: ".",
  interpolation: {
    escapeValue: false, // not needed for react
  },
});

export default i18n;
