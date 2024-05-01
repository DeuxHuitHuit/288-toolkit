import { nodeExternals } from 'rollup-plugin-node-externals';
import { defineConfig, type LibraryFormats, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
	return {
		plugins: [
			dts({
				include: ['src/index.ts']
			}),
			{
				...nodeExternals(),
				name: 'node-externals',
				enforce: 'pre',
				apply: 'build'
			} satisfies Plugin
		],
		build: {
			lib: {
				name: 'vite-plugin-svelte-replacers',
				entry: { index: 'src/index.ts' },
				formats: ['es' as LibraryFormats]
			}
		}
	};
});
