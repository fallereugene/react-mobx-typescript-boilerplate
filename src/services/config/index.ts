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
            WEB_SOCKET_HUB_CONNECTION_URL: process.env.WEB_SOCKET_HUB_CONNECTION_URL,
            PWA_MODE: process.env?.PWA_MODE.toLowerCase() === 'true',
            SW_FILE_NAME: process.env.SW_FILE_NAME ?? 'service-worker',
            SW_DEVELOPMENT_MODE_ENABLE: process.env?.SW_DEVELOPMENT_MODE_ENABLE.toLowerCase() === 'true',
            LOGLEVEL: process.env.LOGLEVEL ? parseInt(process.env.LOGLEVEL, 10) : undefined,
        };
    }
}

export default new Config();
