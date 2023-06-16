import { join } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { rootDir } from '../utils/index.mjs';

const changelog = join(rootDir, 'CHANGELOG.md');

// конфигурация путей, по которым нужно копировать содержимое as is
// в процессе сборки
const config = {
    patterns: [{ from: changelog, to: './' }],
};

export const copyWebpackPlugin = new CopyPlugin(config);
