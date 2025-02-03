import type { Maybe } from '@288-toolkit/types';
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
     * Returns the URL string without the scheme, composed of the pathname, search, and hash.
     */
    toSchemeLess(): Maybe<string>;
    /**
     * Returns the entry uri relative to the language.
     * @deprecated Use `toSchemeLess` instead.
     * It now 'assumes' that the language is the first part of the pathname.
     */
    toLanguageRelative(): Maybe<string>;
}
/**
 * Creates a function that builds URLs for entries.
 * Craft 5 compatible. (Not compatible with Craft 4)
 */
export declare const createEntryUrlBuilder: ({ siteUrl, shouldRemoveTrailingSlash }: EntryUrlParams) => ((entry: Entry) => EntryUrl);
