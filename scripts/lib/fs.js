/* eslint no-console: 0 */
import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';
import { prettierConfig } from './prettier.js';

/**
 * @param {string} metaUrl (from import.meta.url)
 */
export const getDirname = (metaUrl) => {
	return path.dirname(fileURLToPath(metaUrl));
};

const __dirname = getDirname(import.meta.url);

export const SRC_PATH = path.join(__dirname, '../../src');

/**
 *
 * @param {string} filepath
 * @param {string} content
 * @param {(formattedContent: string) => Promise<void>} write
 * @returns
 */
const writeFileWrapper = async (filepath, content, write) => {
	try {
		const formattedContent = await prettier.format(content, {
			...prettierConfig,
			filepath: filepath
		});
		await write(formattedContent);
	} catch (err) {
		console.error(err);
		return;
	}
};

/**
 * Writes the content to a file, overwriting if it exists.
 * @param {string} filepath
 * @param {string} content
 */
export const writeFormattedFile = async (filepath, content) => {
	await writeFileWrapper(filepath, content, async (formattedContent) => {
		await writeFile(filepath, formattedContent);
		console.log(`Wrote ${filepath.replace(SRC_PATH, '')}`);
	});
};

/**
 * Creates a file and writes to it unless it already exists.
 * @param {string} filepath
 * @param {string} content
 */
export const createFormattedFileIfNotExist = async (filepath, content) => {
	await writeFileWrapper(filepath, content, async (formattedContent) => {
		try {
			// The 'wx' flag prevents overwriting the file if it already exists
			await writeFile(filepath, formattedContent, { flag: 'wx' });
			console.log(`Created ${filepath.replace(SRC_PATH, '')}`);
		} catch (err) {
			if (err.code === 'EEXIST') {
				return;
			}
			console.error(err);
		}
	});
};

/**
 * Creates a folder unless it already exists.
 * @param {string} path
 */
export const createFolderIfNotExist = async (path) => {
	try {
		await mkdir(path);
		console.log(`Created folder ${path.replace(SRC_PATH, '')}`);
	} catch (err) {
		// Ignore error if folder already exists
		if (err.code !== 'EEXIST') {
			console.error(err);
			process.exit(10);
		}
	}
};

/**
 * Removes a file.
 * @param {string} filepath
 */
export const removeFile = async (filepath) => {
	try {
		await unlink(filepath);
		console.log(`Removed ${filepath.replace(SRC_PATH, '')}`);
	} catch (err) {
		if (err.code === 'ENOENT') {
			// Silence error if file doesn't exist
			return;
		}
		console.error(err);
	}
};
