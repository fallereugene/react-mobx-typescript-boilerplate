import convict from 'convict';
import { Schema } from './contracts/index.js';
import { EnvVariable } from './constants/index.js';

export const configSchema = convict<Schema>({
    PORT: {
        doc: 'Connection port',
        format: 'port',
        env: EnvVariable.PORT,
        default: 9000,
    },
    HOST: {
        doc: 'Site address.',
        format: String,
        env: EnvVariable.HOST,
        default: '127.0.0.1',
    },
    BASE_API_URL: {
        doc: 'Base API path',
        format: String,
        env: EnvVariable.BASE_API_URL,
        default: '',
    },
});
