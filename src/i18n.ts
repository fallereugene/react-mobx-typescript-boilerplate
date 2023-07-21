import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as localeResources from './locales';

const resources = {
    ...localeResources,
} as const;

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).init({
    debug: process.env.ENV !== 'production' && process.env.NODE_ENV !== 'test',
    fallbackLng: 'ru',
    defaultNS: 'common',
    returnNull: false,
    resources,
    initImmediate: false,
});

export default i18n;
