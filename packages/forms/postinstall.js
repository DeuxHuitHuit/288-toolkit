import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Skip this script if we are in a CI environment
if (process.env.CI) {
	process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const gitConfig = await fs.readFile(path.join(__dirname, '../../.git/config'), {
	encoding: 'utf-8'
});

const inToolkit = !!gitConfig?.match(
	new RegExp('\\[remote "origin"\\]\\s+url = .+288-toolkit\\.git')
)?.[0];

// Skip this script if we are in the toolkit
if (inToolkit) {
	process.exit(0);
}

const constantsPath = './dist/constants.js';
const constants = await fs.readFile(constantsPath, { encoding: 'utf-8' });
const honeypotName = `form_email_${Math.random().toString(36).slice(2)}`;
const updatedConstants = constants.replace(/HONEYPOT_NAME = '(.*)'/g, () => {
	return `HONEYPOT_NAME = '${honeypotName}'`;
});
await fs.writeFile(constantsPath, updatedConstants);
