import fs from 'fs';
import { join } from 'path';
import semver from 'semver';
import { rootDir } from './root-dir.mjs';

export const isSuitableNodeEngine = () => {
    try {
        const { engines } = JSON.parse(fs.readFileSync(join(rootDir, 'package.json'), 'utf-8'));
        if (!semver.satisfies(process.version, engines.node)) {
            // eslint-disable-next-line
            console.log(`Not suitable node version ${process.version}. Required version is ${engines.node}`);
            process.exit(1);
        }
    } catch (e) {
        // eslint-disable-next-line
        console.log('Something went wrong. Please check isSuitableNodeEngine utility function.');
    }

    return true;
};
