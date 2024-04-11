import { beforeAll, vi } from 'vitest';

// Mock DOM elements
beforeAll(() => {
	// Mock window.matchMedia
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false, // No media query matches by default
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	});

	// Remove mobile touch detection
	delete window.ontouchstart;

	// Mock window.IntersectionObserver
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		value: vi.fn().mockImplementation(() => ({
			disconnect: vi.fn(),
			observe: vi.fn(),
			unobserve: vi.fn()
		}))
	});
});
