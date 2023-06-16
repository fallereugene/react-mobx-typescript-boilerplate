import { ESLint } from 'eslint';

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const isIgnored = await Promise.all(
        files.map((file) => {
            return eslint.isPathIgnored(file);
        }),
    );
    const filteredFiles = files.filter((_, i) => !isIgnored[i]);
    return filteredFiles.join(' ');
};

export default {
    '**/*.{ts,tsx,js,jsx,mjs}': async (files) => {
        const filesToLint = await removeIgnoredFiles(files);
        return ['npm run fix:eslint', 'npm run fix:prettier', `eslint --max-warnings=0 ${filesToLint}`];
    },
    '*.scss': 'stylelint',
};
