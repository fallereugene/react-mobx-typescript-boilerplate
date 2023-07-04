import path from 'path';
import fs from 'fs';
import { generateApi } from 'swagger-typescript-api';

const AVAILABLE_EXTENSIONS = ['yaml', 'yml', 'json'];
const IGNORE_FILES = [];
const specPath = path.join(process.cwd(), 'specs');
const outputPath = path.join('src/services/api/__models');

/**
 * Валидация расширений файлов
 * @param {Array<string>} files Массив названий файлов
 * @returns Признак того, все ли файлы имеют валидное расширение
 */
const allFilesHasValidExtensions = (files) => {
    return files.every((filename) => {
        const splittedPath = filename.split('.');
        return IGNORE_FILES.includes(filename) || AVAILABLE_EXTENSIONS.includes(splittedPath[splittedPath.length - 1]);
    });
};

/**
 * Генерация типов
 * @param {string} specPath Путь к файлу спецификации
 * @param {string} outputPath Выходной путь для сгенерированного файла
 */
const generateTypes = async (specPath, outputPath) => {
    const { accessSync, constants } = fs;
    try {
        accessSync(specPath, constants.F_OK);
        generateApi({
            name: 'index.ts',
            output: outputPath,
            input: specPath,
            generateClient: false,
        });
    } catch (err) {
        // eslint-disable-next-line
        console.error(`ERROR: make sure that OpenAPI specification file is exist. Path: ${input}`);
        process.exit(1);
    }
};

fs.readdir(specPath, (err, files) => {
    // eslint-disable-next-line
    console.info(`Types generating. Files: ${files}`);
    try {
        if (!allFilesHasValidExtensions(files)) {
            throw Error();
        }
        files.forEach((file) => {
            const splittedPath = file.split('.');
            const input = path.join(specPath, file);
            const output = path.resolve(`${outputPath}/${splittedPath[0]}`);
            !IGNORE_FILES.includes(file) && generateTypes(input, output);
        });
    } catch (e) {
        // eslint-disable-next-line
        console.error(`Not all files have valid extensions. Check specs directory.`);
        process.exit(1);
    }
});
