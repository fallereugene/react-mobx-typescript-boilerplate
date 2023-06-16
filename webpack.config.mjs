import { merge } from 'webpack-merge';
import { mode, isSuitableNodeEngine } from './webpack/utils/index.mjs';
import baseConfig from './webpack/base.mjs';
import devConfig from './webpack/dev.mjs';
import prodConfig from './webpack/prod.mjs';

isSuitableNodeEngine();

export default () => {
    // eslint-disable-next-line
    console.warn('Building...');
    return mode === 'production' ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);
};
