import { expect, test } from 'vitest';
import { getLanguageRelativeUri } from '../src/getLanguageRelativeUri';

const HOME_URI = '__home__';

test('should return the uri if not home uri', () => {
	const testUri = 'articles/test-article';
	const uri = getLanguageRelativeUri('articles/test-article', HOME_URI);
	expect(uri).toBe(testUri);
});

test('should return empty if home uri', () => {
	const uri = getLanguageRelativeUri(HOME_URI, HOME_URI);
	expect(uri).toBe('');
});
