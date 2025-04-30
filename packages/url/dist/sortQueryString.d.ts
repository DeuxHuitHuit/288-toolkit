/**
 * Sort the query string of a URL
 * @param url - The URL to sort the query string of
 * @param ignoredKeys - The query string parameters to ignore
 * @returns The URL with the sorted query string
 */
export declare const sortQueryString: (url: URL, ignoredKeys?: string[]) => URL;
