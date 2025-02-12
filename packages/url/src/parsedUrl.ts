import { decodePath } from './decodePath.js';
import { protocolLessUrl, schemeLessUrl } from './lessUrl.js';
import { normalizePath } from './normalizePath.js';
import { urlCanParse } from './urlCanParse.js';

/**
 * Safely parses a URL and expose and nice API to access the parts of the URL.
 * If the URL is not valid, all functions returns null.
 */
export const parsedUrl = (url: string | URL) => {
	const parsed = urlCanParse(url.toString()) ? new URL(url) : null;

	const api = {
		/**
		 * The URL object.
		 */
		parsed,
		/**
		 * Checks if the URL is valid.
		 */
		valid: () => {
			return parsed != null && parsed.toString() !== '';
		},
		/**
		 * Makes sure the pathname is properly encoded.
		 * This can be needed when the pathname contains special characters.
		 *
		 * @deprecated Pathname are always url encoded.
		 */
		encodePath: () => {
			if (!parsed) {
				return null;
			}
			parsed.pathname = encodeURIComponent(parsed.pathname);
			return api;
		},
		/**
		 * Decodes the pathname and returns it.
		 * It can't be stored in the URL object because it would be encoded again.
		 */
		decodePath: () => {
			if (!parsed) {
				return null;
			}
			return decodePath(parsed.pathname);
		},
		/**
		 * Normalizes the pathname by removing accents.
		 * @see {@link @288-toolkit/strings#normalize}
		 */
		normalizePath: () => {
			if (!parsed) {
				return api;
			}
			parsed.pathname = normalizePath(parsed.pathname);
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
		 * @deprecated Relative URLs do not start with a single slash.
		 * They are relative to the current URL.
		 * Use `toSchemeLess()` instead.
		 */
		toRelative: () => {
			return api.toSchemeLess();
		},
		/**
		 * Returns the URL string without the scheme, composed of the pathname, search, and hash.
		 * It starts with a single slash.
		 */
		toSchemeLess: () => {
			if (!parsed) {
				return null;
			}
			return schemeLessUrl(parsed);
		},
		/**
		 * Returns the URL string without the protocol, composed of the hostname, pathname, search, and hash.
		 * It starts with a double slash.
		 */
		toProtocolLess: () => {
			if (!parsed) {
				return null;
			}
			return protocolLessUrl(parsed);
		},
		parts: () => {
			if (!parsed) {
				return null;
			}
			return parsed.pathname.split('/').filter(Boolean);
		}
	};

	return api;
};
