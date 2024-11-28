import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/arrays/vitest.config.js',
	'./packages/base64-filters/vitest.config.js',
	'./packages/components/dismissable/vitest.config.js',
	'./packages/components/sprite-animation/vitest.config.js',
	'./packages/components/video-embed/vitest.config.js',
	'./packages/dates/vitest.config.js',
	'./packages/format/vitest.config.js',
	'./packages/html-parser/vitest.config.js',
	'./packages/http/vitest.config.js',
	'./packages/i18n/vitest.config.js',
	'./packages/math/vitest.config.js',
	'./packages/strings/vitest.config.js',
	'./packages/ui/vitest.config.js',
	'./packages/url/vitest.config.js',
	'./packages/vite-plugin-svelte-replacers/vitest.config.js'
]);
