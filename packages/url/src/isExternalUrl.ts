/**
 * Check if a URL is external.
 */
export const isExternalUrl = (url: string) => {
	return !url.startsWith('/') && !url.startsWith('#');
};
