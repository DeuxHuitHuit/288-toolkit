import type { Maybe } from '@288-toolkit/types';
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
export declare const createEntryUrlBuilder: ({ siteUrl, localize, homeUri }: EntryUrlParams) => (entry: Entry) => {
    /**
     * The URL object.
     */
    raw: URL;
    /**
     * Makes sure the pathname is properly encoded.
     * This can be needed when the pathname contains special characters.
     */
    encodePath(): void;
    /**
     * Returns the full URL string.
     */
    toString(): string;
    /**
     * Returns the full URL string.
     */
    toAbsolute(): string;
    /**
     * Returns the URL string without the scheme, composed of the pathname, search, and hash.
     */
    toSchemeLess(): string;
    /**
     * Returns the entry uri relative to the language.
     */
    toLanguageRelative(): string;
};
