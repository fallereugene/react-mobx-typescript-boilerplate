export const svgRule = {
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
};
