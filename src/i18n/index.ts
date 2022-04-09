import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esLanguage from './es.json';
import enLanguage from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esLanguage
      },
      en: {
        translation: enLanguage
      }
    },
    lng: 'es',
    fallbackLng: 'es'
  });

export default i18n;
