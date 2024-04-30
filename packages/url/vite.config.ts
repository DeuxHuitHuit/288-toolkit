import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		plugins: [],
		test: {
			include: ['./test/**/*.spec.ts'],
			environment: 'jsdom',
			css: true,
			globals: true
		}
	};
});
