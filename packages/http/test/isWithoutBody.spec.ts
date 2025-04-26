import { describe, it, expect } from 'vitest';
import { isWithoutBody } from '../src/isWithoutBody';

describe('isWithoutBody', () => {
	it('should return true for GET requests', () => {
		const request = new Request('https://example.org', { method: 'GET' });
		expect(isWithoutBody(request)).toBe(true);
	});

	it('should return true for HEAD requests', () => {
		const request = new Request('https://example.org', { method: 'HEAD' });
		expect(isWithoutBody(request)).toBe(true);
	});

	it('should return false for POST requests', () => {
		const request = new Request('https://example.org', { method: 'POST' });
		expect(isWithoutBody(request)).toBe(false);
	});

	it('should return false for PUT requests', () => {
		const request = new Request('https://example.org', { method: 'PUT' });
		expect(isWithoutBody(request)).toBe(false);
	});

	it('should return false for DELETE requests', () => {
		const request = new Request('https://example.org', { method: 'DELETE' });
		expect(isWithoutBody(request)).toBe(false);
	});
});
