import { devServerConfig } from './configs/index.mjs';
import { isServer } from './utils/index.mjs';
import * as plugins from './plugins/index.mjs';

export default {
    mode: 'development',
    output: {
        pathinfo: true,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    target: 'web',
    devtool: 'cheap-module-source-map',
    devServer: devServerConfig,
    plugins: [isServer && plugins.reactRefreshPlugin].filter(Boolean),
};
