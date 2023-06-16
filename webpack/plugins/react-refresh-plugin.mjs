import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const config = {
    overlay: false,
};

export const reactRefreshPlugin = new ReactRefreshWebpackPlugin(config);
