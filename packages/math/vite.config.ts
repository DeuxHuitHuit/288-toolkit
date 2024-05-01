import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		plugins: [sveltekit()],
		test: {
			include: ['./test/**/*.spec.ts'],
			css: true,
			globals: true
		}
	};
});
