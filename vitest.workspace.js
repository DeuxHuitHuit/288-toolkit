import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/arrays/vitest.config.js',
	'./packages/i18n/vitest.config.js',
	'./packages/format/vitest.config.js',
	'./packages/http/vitest.config.js',
	'./packages/dates/vitest.config.js',
	'./packages/url/vitest.config.js'
]);
