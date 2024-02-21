import { join } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { rootDir } from '../utils/index.mjs';

const changelog = join(rootDir, 'CHANGELOG.md');
const staticAssets = join(rootDir, 'public');

// конфигурация путей, по которым нужно копировать содержимое as is
// в процессе сборки
const config = {
    patterns: [
        {
            from: staticAssets,
            to: './',
            globOptions: {
                ignore: ['**/index.html'],
            },
        },
        { from: changelog, to: './' },
    ],
};

export const copyWebpackPlugin = new CopyPlugin(config);
