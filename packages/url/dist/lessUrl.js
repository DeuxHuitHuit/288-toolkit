/**
 * Returns the URL string without the protocol, composed of the hostname, pathname, search, and hash.
 * It starts with a double slash.
 * @param url - The URL to convert.
 */
export const protocolLessUrl = (url) => {
    const { hostname, pathname, hash, search } = url;
    return `//${hostname}${pathname}${search}${hash}`;
};
/**
 * Returns the URL string without the scheme, composed of the pathname, search, and hash.
 * It starts with a single slash.
 * @param url - The URL to convert.
 */
export const schemeLessUrl = (url) => {
    const { pathname, hash, search } = url;
    return `${pathname}${search}${hash}`;
};
