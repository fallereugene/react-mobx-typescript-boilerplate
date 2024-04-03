module.exports = (api) => {
    // variables passed through package.json commands
    const mode = process.env.MODE === 'development' ? 'development' : 'production';
    // This caches the Babel config by environment.
    api.cache.using(() => mode);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
    };
};
