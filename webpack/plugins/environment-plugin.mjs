import webpack from 'webpack';
import dotenv from 'dotenv';
import { mode } from '../utils/index.mjs';

const config = {
    IS_PRODUCTION_MODE: mode === 'production',
    ...(dotenv.config().parsed || {}),
};

export const environmentPlugin = new webpack.EnvironmentPlugin(config);
