import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { IResource } from './contracts';
import * as localeResources from './locales';

export const resources = {
    ...localeResources,
} as const;

type ExtractedStringTypes = Extract<keyof typeof resources, string>;

export class Localization {
    private readonly isDevelopmentMode = process.env.ENV !== 'production';

    constructor(private lang: typeof i18n) {}

    init() {
        this.lang.use(initReactI18next).init({
            debug: this.isDevelopmentMode,
            fallbackLng: Object.keys(resources),
            defaultNS: ['common'],
            resources: Object.entries(resources).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as IResource),
        });
    }

    /**
     * Изменение текущей локали приложения
     * @param lang Новая локаль
     */
    changeLanguage(lang: ExtractedStringTypes) {
        this.lang.changeLanguage(lang);
    }

    /**
     * Получение текущего языка системы
     */
    getCurrentLanguage(): ExtractedStringTypes {
        return this.lang.language as ExtractedStringTypes;
    }

    /**
     * Получение списка доступных локалей
     */
    static getLanguagesList(): ExtractedStringTypes[] {
        return Object.keys(resources) as ExtractedStringTypes[];
    }
}

export default new Localization(i18n);
