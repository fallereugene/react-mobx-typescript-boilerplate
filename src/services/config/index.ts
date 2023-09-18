import { SETTINGS } from '@/constants';
import { Variables } from './contracts';

export class Config {
    static getConfig(): Variables {
        return {
            IS_PRODUCTION_MODE: process.env.IS_PRODUCTION_MODE,
            BASE_API_URL: process.env.BASE_API_URL ?? SETTINGS.BASE_API_URL,
        };
    }
}

export default new Config();
