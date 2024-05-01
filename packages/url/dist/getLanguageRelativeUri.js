/**
 * Remove the home URI from a URI.
 */
export const getLanguageRelativeUri = (uri, homeUri) => uri?.replace(homeUri, '') || '';
