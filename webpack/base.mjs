import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rootDir } from './utils/index.mjs';
import { alias } from './configs/index.mjs';
import * as plugins from './plugins/index.mjs';
import * as rules from './rules/index.mjs';

// eslint-disable-next-line
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line
const __dirname = dirname(__filename);

export default {
    context: __dirname,
    target: 'web',
    entry: ['core-js', join(rootDir, 'src/index.tsx')],
    output: {
        path: join(rootDir, 'build/dist'),
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
        rules: [rules.javascriptRule, rules.typescriptRule, rules.stylesRule, rules.imagesRule, rules.fontsRule],
    },
    plugins: [
        plugins.htmlWebpackPlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.eslintPlugin,
        plugins.stylelintPlugin,
        plugins.providePlugin,
        plugins.environmentPlugin,
        plugins.copyWebpackPlugin,
    ],
    resolve: {
        alias,
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    watchOptions: {
        // без опции fork-ts-checker-webpack-plugin делает инкрементальную сборку после первого обновления
        // крайне долго. Дольше, чем собирает при запуске.
        // Возможно, в последующих обновлениях исправят:
        // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/769
        ignored: /node_modules/,
    },
};
