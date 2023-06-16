import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Получение и преобразование переданных аргументов при запуске команды
// Например, --env mode=dev --env isDevServer преобразуется в { mode: 'dev', isDevServer: true }
export const getParsedArguments = () => {
    // eslint-disable-next-line
    let { env, _ } = yargs(hideBin(process.argv)).argv;
    env = Array.isArray(env) ? env : env.split(` `);
    let collection = [...env, ..._];
    collection = Array.isArray(collection) ? collection : collection.split(` `);
    return collection.reduce((accumulator, currentValue) => {
        const [key, value = true] = currentValue.split('=');
        return { ...accumulator, [key]: value };
    }, {});
};
