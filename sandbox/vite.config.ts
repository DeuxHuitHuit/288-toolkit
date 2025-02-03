import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const isCI = process.env.CI || process.env.VITEST;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: isCI ? undefined : 3000,
		strictPort: !isCI
	}
});
