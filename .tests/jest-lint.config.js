/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    displayName: 'lint',
    runner: 'jest-runner-eslint',
    testMatch: ['**/*.test.ts*'],
    rootDir: '../src/',
};
