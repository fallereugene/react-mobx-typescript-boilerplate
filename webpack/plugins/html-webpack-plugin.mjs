import { join } from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { rootDir } from '../utils/index.mjs';

const config = {
    minify: {
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
    },
    template: join(rootDir, './public/index.html'),
    meta: {
        viewport: 'width=device-width, initial-scale=1',
    },
    version: `UI ver. ${JSON.parse(fs.readFileSync('package.json')).version}`,
};

export const htmlWebpackPlugin = new HtmlWebpackPlugin(config);
