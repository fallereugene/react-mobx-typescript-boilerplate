import { optimization } from './configs/index.mjs';
import * as plugins from './plugins/index.mjs';

export default {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js',
        clean: true,
    },
    target: ['web', 'es5'],
    optimization,
    plugins: [plugins.miniCssExtractPlugin],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
