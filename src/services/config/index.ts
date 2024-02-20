import { SETTINGS } from '@/constants';
import { Variables } from './contracts';

/**
 * Сервис конфигурации.
 * Предоставляет конфигурационные данные из переменных окружения или дефолтных значений при необходимости.
 */
export class Config {
    static getConfig(): Variables {
        return {
            IS_PRODUCTION_MODE: process.env.IS_PRODUCTION_MODE,
            BASE_API_URL: process.env.BASE_API_URL ?? SETTINGS.BASE_API_URL,
        };
    }
}

export default new Config();
