import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export const optimization = {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
        },
    },
    minimize: true,
    minimizer: [
        new TerserJSPlugin({
            extractComments: false,
            minify: (file, sourceMap) => {
                const uglifyJsOptions = {
                    /* your `uglify-js` package options */
                };

                if (sourceMap) {
                    uglifyJsOptions.sourceMap = {
                        content: sourceMap,
                    };
                }
                // eslint-disable-next-line
                return require('uglify-js').minify(file, uglifyJsOptions);
            },
        }),
        new CssMinimizerPlugin(),
    ],
};
