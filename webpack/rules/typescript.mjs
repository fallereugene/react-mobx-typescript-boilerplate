import { join } from 'path';
import { rootDir, excludeNodeModulesExcept } from '../utils/index.mjs';

export const typescriptRule = {
    test: /\.tsx?$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                configFile: join(rootDir, '/.babelrc.js'),
                cacheCompression: false,
                cacheDirectory: true,
            },
        },
        {
            loader: 'ts-loader',
            options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                logLevel: `info`,
                configFile: 'tsconfig.json',
                happyPackMode: true,
            },
        },
    ],

    exclude: excludeNodeModulesExcept([]),
};
