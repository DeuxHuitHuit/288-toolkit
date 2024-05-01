import path from 'path';
import { createFolderIfNotExist, createFormattedFileIfNotExist, getDirname } from './lib/fs.js';
import { capitalize } from './lib/strings.js';

const __dirname = getDirname(import.meta.url);

const pkgName = process.argv[2];

const PACKAGE_JSON_CONTENT = `
{
	"name": "@288-toolkit/${pkgName}",
	"version": "1.0.0",
	"author": "DeuxHuitHuit",
	"license": "MIT",
	"type": "module",
	"scripts": {
		"build": "svelte-package -i src",
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
    },
	"files": [
		"./dist"
	],
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"svelte": "./dist/index.js"
		}
	},
	"peerDependencies": {
        "@sveltejs/kit": "2.x",
		"svelte": "4.x || 5.x"
    }
}
`;

const README_CONTENT = `
# ${capitalize(pkgName)}

\`\`\`sh
npm i @288-toolkit/${pkgName}
\`\`\`
`;

const TSCONFIG_CONTENT = `
{
	"extends": "../../tsconfig.json",
	"compilerOptions": {}
}
`;

const VITE_CONFIG_CONTENT = `
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		plugins: [sveltekit()],
		test: {
			include: ['./test/**/*.spec.ts'],
			setupFiles: ['./test/setup.ts'],
			environment: 'jsdom',
			css: true,
			globals: true
		}
	};
});
`;

const TEST_SETUP_FILE_CONTENT = `
import '../../../shared/test/mocks/sveltekit';
`;

const PACKAGES_PATH = path.resolve(__dirname, '../packages');
const pkgPath = path.resolve(PACKAGES_PATH, pkgName);

await createFolderIfNotExist(pkgPath);
await createFolderIfNotExist(path.resolve(pkgPath, 'src'));
await createFolderIfNotExist(path.resolve(pkgPath, 'test'));
await createFormattedFileIfNotExist(path.resolve(pkgPath, 'package.json'), PACKAGE_JSON_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, 'README.md'), README_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, 'tsconfig.json'), TSCONFIG_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, 'vite.config.ts'), VITE_CONFIG_CONTENT);
await createFormattedFileIfNotExist(
	path.resolve(pkgPath, 'test/setup.ts'),
	TEST_SETUP_FILE_CONTENT
);
await createFormattedFileIfNotExist(path.resolve(pkgPath, 'src/index.ts'), '');
