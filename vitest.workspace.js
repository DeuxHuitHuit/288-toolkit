import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/i18n/src/vite.config.ts',
	'./packages/format/vite.config.ts',
	'./packages/http/vite.config.ts',
	'./packages/dates/vite.config.ts',
	'./packages/url/vite.config.ts'
]);
