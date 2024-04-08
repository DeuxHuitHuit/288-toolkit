// vite.config.js
import { defineConfig } from 'vite';

export default function config() {
	return defineConfig({
		build: {
			lib: {
				// Could also be a dictionary or array of multiple entry points
				entry: 'src/index.ts',
				name: 'index',
				// the proper extensions will be added
				fileName: 'index'
			},
			rollupOptions: {
				// make sure to externalize deps that shouldn't be bundled
				// into your library
				external: ['svelte'],
				output: {
					// Provide global variables to use in the UMD build
					// for externalized deps
					globals: {
						vue: 'svelte'
					}
				}
			}
		}
	});
}
