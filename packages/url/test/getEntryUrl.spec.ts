import { describe, expect, test } from 'vitest';
import { createEntryUrlBuilder, type EntryUrlParams } from '../src/createEntryUrlBuilder';

const SITE_URL = 'https://example.org';

const mockEntry = {
	url: 'https://example.org/articles/my-article'
};

const globals = {
	siteUrl: SITE_URL
} satisfies EntryUrlParams;

describe('`raw` property should return the url object', () => {
	test('matches the mock entry url', () => {
		const getEntryUrl = createEntryUrlBuilder(globals);
		const rawUrl = getEntryUrl(mockEntry).raw;
		expect(rawUrl).toMatchObject(new URL(mockEntry.url));
	});
	test('returns null if the url is not valid', () => {
		const getEntryUrl = createEntryUrlBuilder(globals);
		const rawUrl = getEntryUrl({ url: 'invalid-url' }).raw;
		expect(rawUrl).toBeNull();
	});
});

describe('`toAbsolute` should return the full url string', () => {
	test('matches the mock entry url', () => {
		const getEntryUrl = createEntryUrlBuilder(globals);
		const fullUrl = getEntryUrl(mockEntry).toAbsolute();
		expect(fullUrl).toBe(mockEntry.url);
	});
	test('returns null if the url is not valid', () => {
		const getEntryUrl = createEntryUrlBuilder(globals);
		const fullUrl = getEntryUrl({ url: 'invalid-url' }).toAbsolute();
		expect(fullUrl).toBeNull();
	});
	test('removes trailing slash if shouldRemoveTrailingSlash is true', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder({ ...globals, shouldRemoveTrailingSlash: true });
		localMock.url = 'https://example.org/articles/my-article/';
		const fullUrl = getEntryUrl(localMock).toAbsolute();
		expect(fullUrl).toBe(mockEntry.url);
	});
	test('does not remove trailing slash if shouldRemoveTrailingSlash is false', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder({ ...globals, shouldRemoveTrailingSlash: false });
		localMock.url = 'https://example.org/en/articles/my-article/';
		const fullUrl = getEntryUrl(localMock).toAbsolute();
		expect(fullUrl).toBe(localMock.url);
	});
});

describe('`toString` should return the full url string', () => {
	test('same as `toAbsolute`', () => {
		const getEntryUrl = createEntryUrlBuilder(globals);
		const fullUrl = getEntryUrl(mockEntry).toString();
		expect(fullUrl).toBe(getEntryUrl(mockEntry).toAbsolute());
	});
});

describe('`toSchemeLess` should return the pathname, search params and hash', () => {
	test('pathname only', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globals);
		localMock.url = 'https://example.org/en/articles/my-article/';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article');
	});
	test('pathname and search params', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globals);
		localMock.url = 'https://example.org/en/articles/my-article?test=yes';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article?test=yes');
	});
	test('pathname, search params and hash', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globals);
		localMock.url = 'https://example.org/en/articles/my-article?test=yes#hash';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article?test=yes#hash');
	});
});

/**
 * @deprecated
 */
describe('`toLanguageRelative` should return the pathname relative to the language', () => {
	test('removes the language from the pathname', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globals);
		localMock.url = 'https://example.org/en/articles/my-article/';
		const languageRelativePath = getEntryUrl(localMock).toLanguageRelative();
		expect(languageRelativePath).toBe('articles/my-article');
	});
});
/* @enddeprecated */
