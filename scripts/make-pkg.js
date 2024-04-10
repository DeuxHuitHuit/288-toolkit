import path from 'path';
import { createFolderIfNotExist, createFormattedFileIfNotExist, getDirname } from './lib/fs.js';

const __dirname = getDirname(import.meta.url);

const pkgName = process.argv[2];

const PACKAGE_JSON_CONTENT = `
{
	"name": "@288-toolkit/${pkgName}",
	"version": "1.0.0",
	"scripts": {},
	"author": "DeuxHuitHuit",
	"license": "MIT"
}
`;

const README_CONTENT = `
# ${pkgName}
`;

const PACKAGES_PATH = path.resolve(__dirname, '../packages');
const pkgPath = path.resolve(PACKAGES_PATH, pkgName);

await createFolderIfNotExist(pkgPath);
await createFolderIfNotExist(path.resolve(pkgPath, 'src'));
await createFormattedFileIfNotExist(path.resolve(pkgPath, `package.json`), PACKAGE_JSON_CONTENT);
await createFormattedFileIfNotExist(path.resolve(pkgPath, `README.md`), README_CONTENT);
