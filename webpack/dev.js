import { devServerConfig } from './configs';
import { getParsedArguments, isServer } from './utils';
import * as plugins from './plugins';

const parsedArgs = getParsedArguments();

export default {
    mode: `development`,
    target: parsedArgs.es5 ? ['web', 'es5'] : `web`,
    devtool: `cheap-module-source-map`,
    devServer: devServerConfig,
    plugins: [isServer && plugins.reactRefreshPlugin].filter(Boolean),
};
