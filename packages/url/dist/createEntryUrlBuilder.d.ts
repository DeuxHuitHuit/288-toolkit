export type Entry = {
    language?: string;
    uri: string;
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
