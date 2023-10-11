import dotenv from 'dotenv';
import { resolve } from 'path';
import { rootDir } from '../utils/index.mjs';

const DEFAULT_PORT = 8080;
const SERVER_HOST = '127.0.0.1';

export const devServerUrl = `http://${SERVER_HOST}:${DEFAULT_PORT}/`;

export const devServerConfig = {
    static: {
        directory: resolve(rootDir, './build/dist/'),
    },
    historyApiFallback: true,
    open: true,
    hot: 'only',
    client: {
        logging: 'info',
        overlay: false,
    },
    compress: true,
    port: DEFAULT_PORT,
    host: SERVER_HOST,
    proxy: {
        /**
         * You can also rewrite paths, e.g. <origin>/api/v1/...
         * Just change the context of proxy server configuration.
         * @example
         * context: (pathname) => {
         *   const paths = [/^\/api/];
         *   return paths.some((path) => path.test(pathname));
         *  },
         */
        context: (pathname) => {
            const paths = [/^\/api/];
            return paths.some((path) => path.test(pathname));
        },
        target: dotenv.config()?.parsed?.PROXY_URL,
        changeOrigin: true,
        secure: false,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
};
