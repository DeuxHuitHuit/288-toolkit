import { defineConfig, type LibraryFormats } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
	return {
		plugins: [
			dts({
				include: ['src/index.ts']
			})
		],
		build: {
			lib: {
				name: 'vite-plugin-svelte-inline-component',
				entry: { index: 'src/index.ts' },
				formats: ['es' as LibraryFormats]
			}
		}
	};
});
