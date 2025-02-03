import { removeTrailingSlash } from '@288-toolkit/strings';
import { normalize } from '@288-toolkit/strings';
import type { Maybe } from '@288-toolkit/types';
import { urlCanParse } from './urlCanParse';

export type Entry = {
	url?: Maybe<string>;
};

export type EntryUrlParams = {
	/**
	 * The site URL, i.e. the URL of your deployment.
	 * The protocol and host are required and will be forced on the entry URL.
	 */
	siteUrl: string;
	/**
	 * Whether to remove the trailing slash from the pathname.
	 * This is required because the home page in craft is an empty pathname, which,
	 * when contacted with the site URL, will result in a trailing slash because Craft
	 * forces the trailing slash on the site URL.
	 *
	 * @default true
	 */
	shouldRemoveTrailingSlash?: boolean;
};

/**
 * Creates a function that builds URLs for entries.
 * Craft 5 compatible. (Not compatible with Craft 4)
 */
export const createEntryUrlBuilder = ({ siteUrl, shouldRemoveTrailingSlash = true }: EntryUrlParams) => {
	if (!urlCanParse(siteUrl)) {
		throw new Error('Invalid site URL');
	}
	const SITE_URL = new URL(siteUrl);
	return (entry: Entry) => {
		if (!entry?.url || !urlCanParse(entry.url)) {
			return {
				raw: null,
				encodePath: () => null,
				normalizePath: () => null,
				toAbsolute: () => null,
				toSchemeLess: () => null,
				/** @deprecated Use `toSchemeLess` instead. */
				toLanguageRelative: () => null,
				toString: () => null
			};
		}
		const url = new URL(entry.url);
		// Replace host and protocol with the site URL
		url.host = SITE_URL.host;
		url.protocol = SITE_URL.protocol;
		// Replace trailing slash in the pathname
		if (shouldRemoveTrailingSlash) {
			url.pathname = removeTrailingSlash(url.pathname);
		}

		// Return the entry URL object
		return {
			/**
			 * The URL object.
			 */
			raw: url,
			/**
			 * Makes sure the pathname is properly encoded.
			 * This can be needed when the pathname contains special characters.
			 */
			encodePath() {
				url.pathname = encodeURIComponent(url.pathname);
			},
			/**
			 * Normalizes the pathname by removing accents.
			 * @see {@link @288-toolkit/strings#normalize}
			 */
			normalizePath() {
				url.pathname = normalize(url.pathname);
			},
			/**
			 * Returns the full URL string.
			 */
			toString() {
				return url.toString();
			},
			/**
			 * Returns the full URL string.
			 */
			toAbsolute() {
				return url.toString();
			},
			/**
			 * Returns the URL string without the scheme, composed of the pathname, search, and hash.
			 */
			toSchemeLess() {
				const { pathname, hash, search } = url;
				return `${pathname}${search}${hash}`;
			},
			/**
			 * Returns the entry uri relative to the language.
			 * @deprecated Use `toSchemeLess` instead.
			 */
			toLanguageRelative() {
				return url.toString();
			}
		};
	};
};
