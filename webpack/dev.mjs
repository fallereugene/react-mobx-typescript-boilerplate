import { devServerConfig } from './configs/index.mjs';
import * as plugins from './plugins/index.mjs';

export default {
    mode: 'development',
    output: {
        pathinfo: true,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    devtool: 'cheap-module-source-map',
    devServer: devServerConfig,
    plugins: [plugins.reactRefreshPlugin].filter(Boolean),
};
