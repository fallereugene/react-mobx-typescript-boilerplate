declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_API_URL: string;
            IS_PRODUCTION_MODE: boolean;
        }
    }
}

export {};
