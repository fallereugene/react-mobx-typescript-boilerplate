import dotenv from 'dotenv';
import { isAnalyzeMode } from '../utils/index.mjs';

const SERVER_HOST = '127.0.0.1';

export const devServerConfig = {
    historyApiFallback: true,
    devMiddleware: {
        writeToDisk: !!isAnalyzeMode,
    },
    open: true,
    hot: 'only',
    client: {
        logging: 'info',
        overlay: false,
    },
    compress: true,
    port: 'auto',
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
