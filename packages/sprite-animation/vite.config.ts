import { svelteInlineComponent } from '@288-toolkit/vite-plugin-svelte-inline-component';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [sveltekit(), mode === 'test' && svelteInlineComponent()],
		test: {
			include: ['./test/**/*.spec.ts'],
			setupFiles: ['./test/setup.ts'],
			environment: 'jsdom',
			css: true,
			globals: true,
			alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }]
		}
	};
});
