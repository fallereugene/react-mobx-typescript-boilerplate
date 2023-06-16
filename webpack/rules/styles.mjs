import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { mode } from '../utils/index.mjs';

export const stylesRule = {
    test: /\.(sa|sc|c)ss$/,
    use: [
        {
            loader: mode === `production` ? MiniCssExtractPlugin.loader : `style-loader`,
            options: {},
        },
        `css-loader`,
        `postcss-loader`,
        `sass-loader`,
    ],
};
