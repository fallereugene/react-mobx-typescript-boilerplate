import webpack from 'webpack';

const { ProvidePlugin } = webpack;

const config = {
    process: 'process/browser',
};

export const providePlugin = new ProvidePlugin(config);
