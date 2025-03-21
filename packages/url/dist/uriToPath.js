import { getLanguageRelativeUri } from './getLanguageRelativeUri.js';
/**
 * Converts a URI to a path.
 * @deprecated Use createEntryUrlBuilder instead.
 */
export const uriToPath = (uri, homeUri) => {
    const pageUri = getLanguageRelativeUri(uri, homeUri);
    const path = pageUri ? `/${pageUri}` : '';
    return path;
};
/* @enddeprecated */
