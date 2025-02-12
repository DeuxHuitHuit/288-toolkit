/**
 * Safely parses a URL and expose and nice API to access the parts of the URL.
 * If the URL is not valid, all functions returns null.
 */
export declare const parsedUrl: (url: string | URL) => {
    /**
     * The URL object.
     */
    parsed: URL | null;
    /**
     * Checks if the URL is valid.
     */
    valid: () => boolean;
    /**
     * Makes sure the pathname is properly encoded.
     * This can be needed when the pathname contains special characters.
     *
     * @deprecated Pathname are always url encoded.
     */
    encodePath: () => any | null;
    /**
     * Decodes the pathname and returns it.
     * It can't be stored in the URL object because it would be encoded again.
     */
    decodePath: () => string | null;
    /**
     * Normalizes the pathname by removing accents.
     * @see {@link @288-toolkit/strings#normalize}
     */
    normalizePath: () => any;
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
     * @deprecated Relative URLs do not start with a single slash.
     * They are relative to the current URL.
     * Use `toSchemeLess()` instead.
     */
    toRelative: () => string | null;
    /**
     * Returns the URL string without the scheme, composed of the pathname, search, and hash.
     * It starts with a single slash.
     */
    toSchemeLess: () => string | null;
    /**
     * Returns the URL string without the protocol, composed of the hostname, pathname, search, and hash.
     * It starts with a double slash.
     */
    toProtocolLess: () => string | null;
    parts: () => string[] | null;
};
