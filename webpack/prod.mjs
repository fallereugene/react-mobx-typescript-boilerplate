import { optimization } from './configs/index.mjs';
import * as plugins from './plugins/index.mjs';

export default {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js',
    },
    optimization,
    plugins: [plugins.miniCssExtractPlugin, plugins.workboxWebpackPlugin],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
