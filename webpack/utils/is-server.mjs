import { getParsedArguments } from './get-parsed-arguments.mjs';

const parsedArguments = getParsedArguments();

export const isServer = parsedArguments.isDevServer ?? false;
