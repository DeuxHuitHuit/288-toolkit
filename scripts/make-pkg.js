import path from 'path';
import { createFolderIfNotExist, createFormattedFileIfNotExist, getDirname } from './lib/fs.js';
import { capitalize } from './lib/strings.js';

const __dirname = getDirname(import.meta.url);

const pkgName = process.argv[2];

const PACKAGE_JSON_CONTENT = `
{
	"name": "@288-toolkit/${pkgName}",
	"version": "1.0.0",
	"scripts": {},
	"author": "DeuxHuitHuit",
	"license": "MIT",
	"scripts": {
        "test": "vitest run",
        "test:watch": "vitest",
		"format:prettier": "prettier --config ./.prettierrc",
		"format:file": "npm run format:prettier -- --write",
		"format": "npm run format:file .",
		"check": "svelte-check --tsconfig ./tsconfig.json --fail-on-warnings",
		"check:watch": "npm run check -- --watch",
		"lint": "eslint --max-warnings=0 --cache .",
		"lint:fix": "npm run lint -- --fix",
		"lc": "npm run lint && npm run check",
		"lc:watch": "npm run lint && npm run check -- --watch"
    }
}
`;

const README_CONTENT = `
# ${capitalize(pkgName)}

[!IMPORTANT] This package only exports typescript files. 
`;

const TSCONFIG_CONTENT = `
{
	"extends": "../../tsconfig.json",
	"include": ["./src"]
}
`;

const PACKAGES_PATH = path.resolve(__dirname, '../packages');
const pkgPath = path.resolve(PACKAGES_PATH, pkgName);

await createFolderIfNotExist(pkgPath);
await createFolderIfNotExist(path.resolve(pkgPath, 'src'));
await createFormattedFileIfNotExist(path.resolve(pkgPath, `package.json`), PACKAGE_JSON_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, `README.md`), README_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, `tsconfig.json`), TSCONFIG_CONTENT);
