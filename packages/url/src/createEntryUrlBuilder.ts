import type { Maybe } from '@288-toolkit/types';
import { uriToPath } from './uriToPath.js';

export type Entry = {
	language?: Maybe<string>;
	uri?: Maybe<string>;
};

export type EntryUrlParams = {
	localize: boolean;
	siteUrl: string;
	homeUri: string;
};

/**
 * Creates a function that builds URLs for entries.
 */
export const createEntryUrlBuilder = ({ siteUrl, localize, homeUri }: EntryUrlParams) => {
	return (entry: Entry) => {
		const language = entry?.language && localize ? `/${entry.language}` : '';
		const uri = uriToPath(entry?.uri || '', homeUri);
		const url = new URL(`${language}${uri}`, siteUrl);

		return {
			/**
			 * The URL object.
			 */
			raw: url,
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
			 */
			toLanguageRelative() {
				return uri;
			}
		};
	};
};
