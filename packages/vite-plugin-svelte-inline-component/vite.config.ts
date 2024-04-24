import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		build: {
			lib: {
				name: 'vite-plugin-svelte-inline-component',
				entry: { index: 'src/index.ts' },
				formats: ['es']
			}
		}
	};
});
