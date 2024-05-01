import * as navigation from '$app/navigation';
import * as stores from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';
import '@testing-library/jest-dom';
import { readable } from 'svelte/store';
import { vi } from 'vitest';
import './window';

// Mock SvelteKit runtime module $app/navigation
vi.mock('$app/navigation', (): typeof navigation => ({
	afterNavigate: vi.fn(),
	beforeNavigate: vi.fn(),
	disableScrollHandling: vi.fn(),
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve({ status: 200, type: 'loaded', data: {} }),
	preloadCode: () => Promise.resolve(),
	onNavigate: () => Promise.resolve(),
	pushState: vi.fn(),
	replaceState: vi.fn()
}));

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost'),
			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {},
			form: undefined,
			state: {}
		});
		const updated = {
			subscribe: readable(false).subscribe,
			check: async () => Promise.resolve(false)
		};

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => Promise.resolve(false)
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});

// Mock dynamic public environment variables
vi.mock('$env/dynamic/public', () => {
	return {
		env: {}
	};
});
