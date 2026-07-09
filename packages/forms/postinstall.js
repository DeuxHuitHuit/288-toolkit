import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));

// Skip in CI — honeypot randomization is for local/prod installs only
if (process.env.CI) {
	process.exit(0);
}

// Only run when installed as a dependency under node_modules, not from monorepo source
if (!packageDir.split(path.sep).includes('node_modules')) {
	process.exit(0);
}

const constantsPath = path.join(packageDir, 'dist', 'constants.js');

try {
	const constants = await fs.readFile(constantsPath, { encoding: 'utf-8' });
	const honeypotName = `form_email_${Math.random().toString(36).slice(2)}`;
	const updatedConstants = constants.replace(/HONEYPOT_NAME = '(.*)'/g, () => {
		return `HONEYPOT_NAME = '${honeypotName}'`;
	});

	if (updatedConstants === constants) {
		process.exit(0);
	}

	await fs.writeFile(constantsPath, updatedConstants);
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.warn(`[@288-toolkit/forms] postinstall skipped: ${message}`);
	process.exit(0);
}
