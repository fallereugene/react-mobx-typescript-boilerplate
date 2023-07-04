// eslint-disable-next-line
const tsConfig = require('../tsconfig');

const moduleNameAliasesMapper = {};
// eslint-disable-next-line jest/require-hook
Object.entries(tsConfig.compilerOptions.paths).forEach(([key, value]) => {
    let alias = key.replace('/*', '');
    let path = value[0].replace('/*', '');

    if (alias === '@') {
        alias += '/';
        path += '/';
    }

    // "^@/(.*)$": "<rootDir>/src/$1"
    // "^@components(.*)$": "<rootDir>/src/components$1"
    moduleNameAliasesMapper[`^${alias}(.*)$`] = `<rootDir>/${path}$1`;
});

const esModules = ['moq.ts'];

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    displayName: 'test',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/.tests/__mocks__/file-mock.js',
        // '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(css|less|sass|scss)$': '<rootDir>/.tests/__mocks__/style-mock.js',
        uuid: require.resolve('uuid'),
        ...moduleNameAliasesMapper,
    },
    setupFiles: ['<rootDir>/.tests/jest.setup.js'],
    transformIgnorePatterns: [`/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.mjs$': 'babel-jest',
    },
    rootDir: '../',
    coverageDirectory: '<rootDir>/build/coverage',
};
