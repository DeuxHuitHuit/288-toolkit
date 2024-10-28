import { describe, expect, test } from 'vitest';
import { parsedUrl } from "../src/parsedUrl.js";

describe('`parsed` property should return the url object', () => {
	test('localized', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.parsed).toMatchObject(new URL('https://example.com/path/to/resource'));
	});
});

describe('`valid` property should return true if the url is valid', () => {
	test('valid', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.valid()).toBe(true);
	});
	test('invalid', () => {
		const url = parsedUrl('invalid');
		expect(url.valid()).toBe(false);
	});
});

describe('`parts` property should return the parts of the url', () => {
	test('valid', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.parts()).toEqual(['path', 'to', 'resource']);
	});
});

describe('`toString` method should return the url string', () => {
	test('valid', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.toString()).toBe('https://example.com/path/to/resource');
	});
});

describe('`toAbsolute` method should return the absolute url string', () => {
	test('valid', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.toAbsolute()).toBe('https://example.com/path/to/resource');
	});
});

describe('`toSchemeLess` method should return the url string without the scheme', () => {
	test('valid', () => {
		const url = parsedUrl('https://example.com/path/to/resource');
		expect(url.toSchemeLess()).toBe('//example.com/path/to/resource');
	});
});
