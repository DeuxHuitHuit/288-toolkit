import { expect, test } from 'vitest';
import { validateSameOrigin } from '../src/validateSameOrigin';

const reqUrl = 'https://test.com';

test('Should return false if url is not of the same origin', () => {
	const evilUrl = 'https://evil.com';
	const result = validateSameOrigin(reqUrl, evilUrl);
	expect(result).toBe(false);
});

test('Should return true if the url is a relative path', () => {
	const relativePath = '/my/relative/path';
	const result = validateSameOrigin(reqUrl, relativePath);
	expect(result).toBe(true);
});

test('Should return true if the url is of the same origin', () => {
	const sameOriginUrl = 'https://test.com/my/relative/path';
	const result = validateSameOrigin(reqUrl, sameOriginUrl);
	expect(result).toBe(true);
});
