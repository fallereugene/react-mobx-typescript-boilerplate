import webpack from 'webpack';
import dotenv from 'dotenv';
import { mode, isServer } from '../utils/index.mjs';

const config = {
    ENV: JSON.stringify(mode),
    IS_DEV_SERVER: JSON.stringify(isServer),
    ...(dotenv.config().parsed || {}),
};

export const environmentPlugin = new webpack.EnvironmentPlugin(config);
