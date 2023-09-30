import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languagesMap } from './languagesMap';
import { en } from './resources';
import { pl } from "./resources/pl";

const isDevelopment = process.env.NODE_ENV === 'development';

const handleLangChange = (lang) => {
  moment.locale(lang);

  document.documentElement.setAttribute('lang', lang);
  document.title = i18next.t('head.title');
  document.querySelector('meta[name="description"]').setAttribute('content', i18next.t('head.title'));
};

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: isDevelopment,
    fallbackLng: isDevelopment ? 'dev' : languagesMap.en,
    lng: window.localStorage.getItem('i18nextLng') || navigator.language,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      [languagesMap.en]: {
        translation: en
      },
      [languagesMap.pl]: {
        translation: pl
      },
    }
  }, () => {
    handleLangChange(i18next.language);
  });

i18next.on('languageChanged', handleLangChange);

export default i18next;
