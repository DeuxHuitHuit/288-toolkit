/**
 * Remove the home URI from a URI.
 * @deprecated  This was used with Craft 4. With Craft 5, use createEntryUrlBuilder instead.
 */
export const getLanguageRelativeUri = (uri: string, homeUri: string) =>
	uri?.replace(homeUri, '') || '';
/* @enddeprecated */
