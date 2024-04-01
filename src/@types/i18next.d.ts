import ruTranslationJson from '../../public/locales/ru/translation.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'ru';
        resources: {
            ru: typeof ruTranslationJson;
        };
    }
}
