import { join } from 'path';
import { rootDir, excludeNodeModulesExcept } from '../utils/index.mjs';

export const babelLoader = {
    loader: 'babel-loader',
    options: {
        configFile: join(rootDir, '/.babelrc.js'),
        cacheCompression: false,
        cacheDirectory: true,
    },
};

export const javascriptRule = {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    use: [babelLoader],
    exclude: excludeNodeModulesExcept([]),
};
