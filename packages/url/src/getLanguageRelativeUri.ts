/**
 * Remove the home URI from a URI.
 */
export const getLanguageRelativeUri = (uri: string, homeUri: string) =>
	uri?.replace(homeUri, '') || '';
