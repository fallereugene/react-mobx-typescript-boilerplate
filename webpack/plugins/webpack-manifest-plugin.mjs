import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

const config = {
    fileName: 'asset-manifest.json',
    publicPath: '/',
    generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce(
            (manifest, file) => Object.assign(manifest, { [file.name]: file.path }),
            seed,
        );
        const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

        return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
        };
    },
};

export const webpackManifestPlugin = new WebpackManifestPlugin(config);
