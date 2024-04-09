// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		css: true,
		// We need to disable parallelism in CI because we can not afford to have
		// multiple process/browsers running at the same time.
		threads: !process.env.CI,
		include: ['./packages/**/*.spec.{js,mjs,cjs,ts}'],
		coverage: {
			exclude: ['setup.ts', 'test/mocks/**', 'vite/plugins/**']
		},
		// This alias is needed until this is resolved: https://github.com/vitest-dev/vitest/issues/2834
		alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }]
	}
});
