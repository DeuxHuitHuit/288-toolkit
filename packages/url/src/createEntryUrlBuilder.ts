import { removeTrailingSlash } from '@288-toolkit/strings';
import type { Maybe } from '@288-toolkit/types';
import { decodePath } from './decodePath.js';
import { protocolLessUrl, schemeLessUrl } from './lessUrl.js';
import { normalizePath } from './normalizePath.js';
import { urlCanParse } from './urlCanParse.js';

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

export interface EntryUrl {
	/**
	 * The URL object.
	 */
	raw: Maybe<URL>;

	/**
	 * Returns the pathname decoded.
	 */
	decodedPath(): string;

	/**
	 * Normalizes the pathname by removing accents.
	 * @see {@link @288-toolkit/strings#normalize}
	 */
	normalizePath(): EntryUrl;

	/**
	 * Returns the full URL string.
	 */
	toString(): string;

	/**
	 * Returns the full URL string.
	 */
	toAbsolute(): Maybe<string>;

	/**
	 * Returns the URL string without the protocol, composed of the hostname, pathname, search, and hash.
	 */
	toProtocolLess(): Maybe<string>;

	/**
	 * Returns the URL string without the scheme, composed of the pathname, search, and hash.
	 */
	toSchemeLess(): Maybe<string>;

	/**
	 * Returns the entry uri relative to the language.
	 * @deprecated Use `toSchemeLess` instead.
	 * It now 'assumes' that the language is the first part of the pathname.
	 */
	toLanguageRelative(): Maybe<string>;
	/* @enddeprecated */
}

/**
 * Creates a function that builds URLs for entries.
 * Craft 5 compatible. (Not compatible with Craft 4)
 */
export const createEntryUrlBuilder = ({
	siteUrl,
	shouldRemoveTrailingSlash = true
}: EntryUrlParams): ((entry: Entry) => EntryUrl) => {
	if (!urlCanParse(siteUrl)) {
		throw new Error('Invalid site URL');
	}
	const SITE_URL = new URL(siteUrl);
	return (entry: Entry) => {
		if (!entry?.url || !urlCanParse(entry.url)) {
			const empty = {
				raw: null,
				decodedPath: () => '',
				normalizePath: () => empty,
				toAbsolute: () => null,
				toProtocolLess: () => null,
				toSchemeLess: () => null,
				/** @deprecated Use `toSchemeLess` instead. */
				toLanguageRelative: () => null,
				/* @enddeprecated */
				toString: () => ''
			} satisfies EntryUrl;
			return empty;
		}
		const url = new URL(entry.url);
		// Replace protocol, host and port with the site URL
		url.host = SITE_URL.host;
		url.protocol = SITE_URL.protocol;
		url.port = SITE_URL.port;
		// Replace trailing slash in the pathname
		if (shouldRemoveTrailingSlash) {
			url.pathname = removeTrailingSlash(url.pathname);
		}

		const self = {
			raw: url,
			decodedPath() {
				return decodePath(url.pathname);
			},
			normalizePath() {
				url.pathname = normalizePath(url.pathname);
				return self;
			},
			toString() {
				return url.toString();
			},
			toAbsolute() {
				return url.toString();
			},
			toProtocolLess() {
				return protocolLessUrl(url);
			},
			toSchemeLess() {
				return schemeLessUrl(url);
			},
			/** @deprecated Use `toSchemeLess` instead. */
			toLanguageRelative() {
				return url.pathname.split('/').filter(Boolean).slice(1).join('/');
			}
			/* @enddeprecated */
		} satisfies EntryUrl;
		return self;
	};
};
