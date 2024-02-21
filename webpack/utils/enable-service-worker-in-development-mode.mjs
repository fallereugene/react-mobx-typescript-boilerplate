import dotenv from 'dotenv';

export const enableServiceWorkerInDevelopmentMode = dotenv.config()?.parsed?.SW_DEVELOPMENT_MODE_ENABLE === 'true';
