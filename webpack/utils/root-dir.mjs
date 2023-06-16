import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

// eslint-disable-next-line
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line
const __dirname = dirname(__filename);

export const rootDir = join(__dirname, '../../');
