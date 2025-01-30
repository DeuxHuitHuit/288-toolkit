/**
 * Remove the home URI from a URI.
 * @deprecated Use createEntryUrlBuilder instead.
 */
export const getLanguageRelativeUri = (uri: string, homeUri: string) =>
	uri?.replace(homeUri, '') || '';
/* @enddeprecated */
