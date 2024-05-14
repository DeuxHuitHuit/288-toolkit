import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Skip this script if we are in a CI environment
if (process.env.CI) {
	process.exit(0);
}

if (!process.cwd().includes('node_modules')) {
	process.exit(0);
}

const constantsPath = './dist/constants.js';
const constants = await fs.readFile(constantsPath, { encoding: 'utf-8' });
const honeypotName = `form_email_${Math.random().toString(36).slice(2)}`;
const updatedConstants = constants.replace(/HONEYPOT_NAME = '(.*)'/g, () => {
	return `HONEYPOT_NAME = '${honeypotName}'`;
});
await fs.writeFile(constantsPath, updatedConstants);
