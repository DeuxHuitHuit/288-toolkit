/**
 * Safely parses a URL and expose and nice API to access the parts of the URL.
 * If the URL is not valid, all functions returns null.
 */
export declare const parsedUrl: (url: string | URL) => {
    /**
     * The URL object.
     */
    parsed: URL | null;
    valid: () => boolean;
    /**
     * Makes sure the pathname is properly encoded.
     * This can be needed when the pathname contains special characters.
     */
    encodePath: () => any | null;
    /**
     * Returns the full URL string.
     */
    toString: () => string | null;
    /**
     * Returns the full URL string.
     */
    toAbsolute: () => string | null;
    /**
     * Returns the relative URL string.
     * It starts with a single slash.
     */
    toRelative: () => string | null;
    /**
     * Returns the URL string without the scheme, composed of the pathname, search, and hash.
     * It starts with a double slash.
     */
    toSchemeLess: () => string | null;
    parts: () => string[] | null;
};
