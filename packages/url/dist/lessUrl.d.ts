/**
 * Returns the URL string without the protocol, composed of the hostname, pathname, search, and hash.
 * It starts with a double slash.
 * @param url - The URL to convert.
 */
export declare const protocolLessUrl: (url: URL) => string;
/**
 * Returns the URL string without the scheme, composed of the pathname, search, and hash.
 * It starts with a single slash.
 * @param url - The URL to convert.
 */
export declare const schemeLessUrl: (url: URL) => string;
