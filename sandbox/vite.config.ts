import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: process.env.CI || process.env.VITEST ? undefined : 3000,
		strictPort: true
	}
});
