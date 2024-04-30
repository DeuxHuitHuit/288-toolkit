import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
	compilerOptions: {
		accessors: !!process.env.VITEST
	},
	preprocess: [preprocess()]
};
