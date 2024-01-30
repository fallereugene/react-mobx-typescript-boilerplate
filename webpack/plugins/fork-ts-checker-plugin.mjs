import { join } from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { rootDir, mode } from '../utils/index.mjs';

const config = {
    async: mode !== 'production',
    typescript: {
        configFile: join(rootDir, '/tsconfig.json'),
        mode: 'write-references',
    },
};

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(config);
