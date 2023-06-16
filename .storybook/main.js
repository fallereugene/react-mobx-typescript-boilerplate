const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    features: {
        emotionAlias: false,
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components/'),
            '@containers': path.resolve(__dirname, '../src/containers/'),
            '@routes': path.resolve(__dirname, '../src/routes/'),
            '@hocs': path.resolve(__dirname, '../src/hocs/'),
            '@core': path.resolve(__dirname, '../src/core/'),
            '@services': path.resolve(__dirname, '../src/services/'),
            '@assets': path.resolve(__dirname, '../src/assets/'),
            '@utils': path.resolve(__dirname, '../src/utils/index'),
        };
        return config;
    },
};
