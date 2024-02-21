import dotenv from 'dotenv';
import fs from 'fs';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import { join } from 'path';
import { rootDir } from '../utils/index.mjs';

export const workboxWebpackPlugin = (() => {
    if (!fs.existsSync(join(rootDir, 'src/sw.ts'))) {
        return null;
    }

    return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: join(rootDir, 'src/sw.ts'),
        // this is the output of the plugin,
        // relative to webpack's output directory
        swDest: `${dotenv.config()?.parsed?.SW_FILE_NAME ?? 'service-worker'}.js`,
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    });
})();
