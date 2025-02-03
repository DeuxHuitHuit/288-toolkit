/**
 * Remove the home URI from a URI.
 * @deprecated Use createEntryUrlBuilder instead.
 */
export const getLanguageRelativeUri = (uri, homeUri) => uri?.replace(homeUri, '') || '';
/* @enddeprecated */
