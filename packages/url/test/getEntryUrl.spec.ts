import { describe, expect, test } from 'vitest';
import { createEntryUrlBuilder, type EntryUrlParams } from '../src/createEntryUrlBuilder';

const HOME_URI = '__home__';
const SITE_URL = 'https://example.org';

const mockEntry = {
	language: 'en',
	uri: 'articles/my-article'
};

const globalsLocalized = {
	localize: true,
	siteUrl: SITE_URL,
	homeUri: HOME_URI
} satisfies EntryUrlParams;

const globalsNonLocalized = {
	localize: false,
	siteUrl: SITE_URL,
	homeUri: HOME_URI
} satisfies EntryUrlParams;

const mockUrlLocalized = `${globalsLocalized.siteUrl}/${mockEntry.language}/${mockEntry.uri}`;
const mockUrlNonLocalized = `${globalsNonLocalized.siteUrl}/${mockEntry.uri}`;

describe('`raw` property should return the url object', () => {
	test('localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsLocalized);
		const rawUrl = getEntryUrl(mockEntry).raw;
		expect(rawUrl).toMatchObject(new URL(mockUrlLocalized));
	});

	test('non-localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsNonLocalized);
		const rawUrl = getEntryUrl(mockEntry).raw;
		expect(rawUrl).toMatchObject(new URL(mockUrlNonLocalized));
	});
});

describe('`toAbsolute` should return the full url string', () => {
	test('localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsLocalized);
		const fullUrl = getEntryUrl(mockEntry).toAbsolute();
		expect(fullUrl).toBe(mockUrlLocalized);
	});
	test('non-localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsNonLocalized);
		const fullUrl = getEntryUrl(mockEntry).toAbsolute();
		expect(fullUrl).toBe(mockUrlNonLocalized);
	});
});

describe('`toString` should return the full url string', () => {
	test('localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsLocalized);
		const fullUrl = getEntryUrl(mockEntry).toString();
		expect(fullUrl).toBe(mockUrlLocalized);
	});
	test('non-localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsNonLocalized);
		const fullUrl = getEntryUrl(mockEntry).toString();
		expect(fullUrl).toBe(mockUrlNonLocalized);
	});
});

describe('`toLanguageRelative` should return the entry uri', () => {
	test('localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsLocalized);
		const languageRelativeUrl = getEntryUrl(mockEntry).toLanguageRelative();
		expect(languageRelativeUrl).toBe(`/${mockEntry.uri}`);
	});
	test('non-localized', () => {
		const getEntryUrl = createEntryUrlBuilder(globalsNonLocalized);
		const languageRelativeUrl = getEntryUrl(mockEntry).toLanguageRelative();
		expect(languageRelativeUrl).toBe(`/${mockEntry.uri}`);
	});
});

describe('`toSchemeLess` should return the pathname, search params and hash', () => {
	test('localized', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globalsLocalized);
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article');
		localMock.uri = 'articles/my-article?test=yes';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article?test=yes');
		localMock.uri = 'articles/my-article?test=yes#hash';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/en/articles/my-article?test=yes#hash');
	});
	test('non-localized', () => {
		const localMock = { ...mockEntry };
		const getEntryUrl = createEntryUrlBuilder(globalsNonLocalized);
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/articles/my-article');
		localMock.uri = 'articles/my-article?test=yes';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/articles/my-article?test=yes');
		localMock.uri = 'articles/my-article?test=yes#hash';
		expect(getEntryUrl(localMock).toSchemeLess()).toBe('/articles/my-article?test=yes#hash');
	});
});
