import { svelteInlineComponent } from '@288-toolkit/vite-plugin-svelte-inline-component';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineProject, mergeConfig } from 'vitest/config';
import baseConfig from '../../../vitest.shared';

export default mergeConfig(
	baseConfig,
	defineProject({
		test: {
			setupFiles: ['./test/setup.ts']
		},
		plugins: [sveltekit(), svelteTesting(), svelteInlineComponent()]
	})
);
