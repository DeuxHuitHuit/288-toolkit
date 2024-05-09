import fs from 'fs/promises';

const constantsPath = './dist/constants.js';
const constants = await fs.readFile(constantsPath, { encoding: 'utf-8' });
const honeypotName = `form_email_${Math.random().toString(36).slice(2)}`;
const updatedConstants = constants.replace(/HONEYPOT_NAME = '(.*)'/g, () => {
	return `HONEYPOT_NAME = '${honeypotName}'`;
});
await fs.writeFile(constantsPath, updatedConstants);
