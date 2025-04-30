import { describe, expect, it } from 'vitest';
import { sortQueryString } from '../src/sortQueryString';

describe('sortQueryString', () => {
	it('should sort query parameters alphabetically', () => {
		const url = new URL('https://example.org/path?c=3&a=1&b=2');
		const sorted = sortQueryString(url);
		expect(sorted.toString()).toBe('https://example.org/path?a=1&b=2&c=3');
	});

	it('should handle empty query strings', () => {
		const url = new URL('https://example.org/path');
		const sorted = sortQueryString(url);
		expect(sorted.toString()).toBe('https://example.org/path');
	});

	it('should ignore specified query parameters', () => {
		const url = new URL('https://example.org/path?c=3&a=1&b=2');
		const sorted = sortQueryString(url, ['b']);
		expect(sorted.toString()).toBe('https://example.org/path?a=1&c=3');
	});

	it('should handle empty parameter values', () => {
		const url = new URL('https://example.org/path?c=&a=1&b=');
		const sorted = sortQueryString(url);
		expect(sorted.toString()).toBe('https://example.org/path?a=1&b=&c=');
	});
});
