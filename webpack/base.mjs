import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rootDir, isAnalyzeMode, enableServiceWorkerInDevelopmentMode, mode } from './utils/index.mjs';
import { alias } from './configs/index.mjs';
import * as plugins from './plugins/index.mjs';
import * as rules from './rules/index.mjs';

// eslint-disable-next-line
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line
const __dirname = dirname(__filename);

export default {
    context: __dirname,
    target: ['web', 'es5'],
    entry: [join(rootDir, 'src/index.ts')],
    output: {
        path: join(rootDir, 'build/dist'),
        publicPath: '/',
    },
    cache: {
        type: 'filesystem',
        version: String(Date.now()),
        cacheDirectory: join(rootDir, 'node_modules/.cache'),
        store: 'pack',
        buildDependencies: {
            defaultWebpack: ['webpack/lib/'],
            config: [__filename],
            tsconfig: [join(rootDir, 'tsconfig.json')].filter((f) => fs.existsSync(f)),
        },
    },
    module: {
        rules: [...Object.values(rules)],
    },
    plugins: [
        plugins.htmlWebpackPlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.eslintPlugin,
        plugins.stylelintPlugin,
        plugins.providePlugin,
        plugins.environmentPlugin,
        plugins.copyWebpackPlugin,
        plugins.webpackManifestPlugin,
        enableServiceWorkerInDevelopmentMode && mode === 'development' && plugins.workboxWebpackPlugin,
        isAnalyzeMode && plugins.bundleAnalyzerPlugin,
    ].filter(Boolean),
    resolve: {
        alias,
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
};
