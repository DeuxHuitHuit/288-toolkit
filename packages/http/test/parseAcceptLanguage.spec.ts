import { expect, test } from 'vitest';
import { parseAcceptLanguage } from '../src/parseAcceptLanguage';

test('should return null', () => {
	expect(parseAcceptLanguage('')).toBeNull();
});

test('should find all languages and locales', () => {
	expect(parseAcceptLanguage('en,fr')).toEqual([
		{
			lang: 'en',
			priority: 1
		},
		{
			lang: 'fr',
			priority: 0.999999999
		}
	]);
	expect(parseAcceptLanguage('en,fr,es,de,pt,it;q=0.7')).toEqual([
		{
			lang: 'en',
			priority: 0.7
		},
		{
			lang: 'fr',
			priority: 0.699999999
		},
		{
			lang: 'es',
			priority: 0.699999998
		},
		{
			lang: 'de',
			priority: 0.699999997
		},
		{
			lang: 'pt',
			priority: 0.6999999960000001
		},
		{
			lang: 'it',
			priority: 0.6999999950000001
		}
	]);
	expect(parseAcceptLanguage('en-US,en;q=0.9,fr;q=0.8')).toEqual([
		{
			lang: 'en-US',
			priority: 0.9
		},
		{
			lang: 'en',
			priority: 0.899999999
		},
		{
			lang: 'fr',
			priority: 0.8
		}
	]);
});

test('should respect unordered priorities', () => {
	expect(parseAcceptLanguage('en;q=0.9,fr,fr-CA;q=0.7,es;q=0.8')).toEqual([
		{
			lang: 'en',
			priority: 0.9
		},
		{
			lang: 'es',
			priority: 0.8
		},
		{
			lang: 'fr',
			priority: 0.7
		},
		{
			lang: 'fr-CA',
			priority: 0.699999999
		}
	]);
});

test('should default on empty ;q=,', () => {
	expect(parseAcceptLanguage('en;q=0.9,fr;q=,es')).toEqual([
		{
			lang: 'en',
			priority: 0.9
		},
		{
			lang: 'fr',
			priority: 0.899999999
		},
		{
			lang: 'es',
			priority: 0.8999999980000001
		}
	]);
	expect(parseAcceptLanguage('en;q=0.9;,q=,es')).toEqual([
		{
			lang: 'en',
			priority: 0.9
		},
		// we don't care about q lang in this case,
		// we only care about the priority not being 0
		{
			lang: 'q',
			priority: 0.899999999
		},
		{
			lang: 'es',
			priority: 0.8999999980000001
		}
	]);
});
