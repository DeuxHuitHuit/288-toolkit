import { getLanguageRelativeUri } from './getLanguageRelativeUri.js';

/**
 * Converts a URI to a path.
 */
export const uriToPath = (uri: string, homeUri: string) => {
	const pageUri = getLanguageRelativeUri(uri, homeUri);
	const path = pageUri ? `/${pageUri}` : '';
	return path;
};
