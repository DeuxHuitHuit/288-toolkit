/**
 * Check if a URL is external.
 */
export const isExternalUrl = (url) => {
    return !url.startsWith('/') && !url.startsWith('#');
};
