import { normalize } from '@288-toolkit/strings';
import { urlCanParse } from './urlCanParse.js';
/**
 * Safely parses a URL and expose and nice API to access the parts of the URL.
 * If the URL is not valid, all functions returns null.
 */
export const parsedUrl = (url) => {
    const parsed = urlCanParse(url) ? new URL(url) : null;
    const api = {
        /**
         * The URL object.
         */
        parsed,
        valid: () => {
            return parsed != null && parsed.toString() !== '';
        },
        /**
         * Makes sure the pathname is properly encoded.
         * This can be needed when the pathname contains special characters.
         */
        encodePath: () => {
            if (!parsed) {
                return null;
            }
            parsed.pathname = encodeURIComponent(parsed.pathname);
            return api;
        },
        /**
         * Normalizes the pathname by removing accents.
         * @see {@link @288-toolkit/strings#normalize}
         */
        normalizePath: () => {
            if (!parsed) {
                return null;
            }
            parsed.pathname = normalize(parsed.pathname);
            return api;
        },
        /**
         * Returns the full URL string.
         */
        toString: () => {
            return parsed?.toString() ?? null;
        },
        /**
         * Returns the full URL string.
         */
        toAbsolute: () => {
            return parsed?.toString() ?? null;
        },
        /**
         * Returns the relative URL string.
         * It starts with a single slash.
         */
        toRelative: () => {
            if (!parsed) {
                return null;
            }
            const { pathname, hash, search } = parsed;
            return `${pathname}${search}${hash}`;
        },
        /**
         * Returns the URL string without the scheme, composed of the pathname, search, and hash.
         * It starts with a double slash.
         */
        toSchemeLess: () => {
            if (!parsed) {
                return null;
            }
            const { hostname, pathname, hash, search } = parsed;
            return `//${hostname}${pathname}${search}${hash}`;
        },
        parts: () => {
            if (!parsed) {
                return null;
            }
            return parsed.pathname.split('/').filter(Boolean);
        },
    };
    return api;
};
