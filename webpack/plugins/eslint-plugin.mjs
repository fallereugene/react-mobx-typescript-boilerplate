import { join } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import { rootDir, mode } from '../utils/index.mjs';

const config = {
    context: join(rootDir, '/src'),
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    emitWarning: true,
    emitError: true,
    cache: true,
    cacheLocation: join(rootDir, 'node_modules/.cache/.eslintcache'),
    failOnError: mode === 'production',
};

export const eslintPlugin = new ESLintPlugin(config);
