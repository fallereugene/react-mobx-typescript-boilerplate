const path = require('path');
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier', 'jest'],
    env: {
        browser: true,
        jest: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:jest/recommended',
        'plugin:storybook/recommended',
    ],
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*'],
            },
        ],
        indent: 'off',
        'no-unused-expressions': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'import/prefer-default-export': 'off',
        'max-len': [
            'error',
            {
                code: 120,
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'jest/no-hooks': [
            'error',
            {
                allow: ['beforeAll', 'beforeEach', 'afterEach', 'afterAll'],
            },
        ],
        'jest/max-expects': [
            'error',
            {
                max: 20,
            },
        ],
        'jest/unbound-method': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['server/*'],
};
