import preprocess from 'svelte-preprocess';
import env from './env.config.js';

const production = env.production;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		accessors: !!process.env.VITEST
	},
	preprocess: [
		preprocess({
			sourceMap: !production
		})
	],
	vitePlugin: {
		inspector: !production
	}
};

export default config;
