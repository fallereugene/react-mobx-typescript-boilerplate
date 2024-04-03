import { merge } from 'webpack-merge';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { mode, isSuitableNodeEngine, isAnalyzeMode } from './webpack/utils/index.mjs';
import baseConfig from './webpack/base.mjs';
import devConfig from './webpack/dev.mjs';
import prodConfig from './webpack/prod.mjs';

isSuitableNodeEngine();

export default () => {
    // eslint-disable-next-line
    console.warn('Building...');
    const webpackConfig = mode === 'production' ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);

    return isAnalyzeMode ? new SpeedMeasurePlugin().wrap(webpackConfig) : webpackConfig;
};
