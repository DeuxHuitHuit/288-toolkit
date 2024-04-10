import { readFile } from 'fs/promises';

// TODO: change to proper json import when supported...
export const prettierConfig = JSON.parse(await readFile('./.prettierrc', { encoding: 'utf-8' }));
