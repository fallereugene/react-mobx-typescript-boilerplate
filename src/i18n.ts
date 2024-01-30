import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // более детальная информация по опциям определения языковой принадлежности
        // https://github.com/i18next/i18next-browser-languageDetector?tab=readme-ov-file#detector-options
        detection: {},
        debug: process.env.ENV !== 'production' && process.env.NODE_ENV !== 'test',
        fallbackLng: 'ru',
    });

export default i18n;
