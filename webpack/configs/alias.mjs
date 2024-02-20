import { resolve } from 'path';
import { rootDir } from '../utils/index.mjs';

export const alias = {
    '@': resolve(rootDir, './src'),
    '@components': resolve(rootDir, './src/components/'),
    '@containers': resolve(rootDir, './src/containers/'),
    '@routes': resolve(rootDir, './src/routes/'),
    '@hocs': resolve(rootDir, './src/hocs/'),
    '@core': resolve(rootDir, './src/core/'),
    '@services': resolve(rootDir, './src/services/'),
    '@assets': resolve(rootDir, './src/assets/'),
    '@utils': resolve(rootDir, './src/utils/index'),
    '@storybook-utils': resolve(rootDir, './.storybook/utils'),
};
