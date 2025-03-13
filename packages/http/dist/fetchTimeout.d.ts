/**
 * Fetch with a timeout
 * @param url - The URL to fetch
 * @param options - The options for the fetch
 * @param timeout - The timeout in milliseconds. Defaults to 20 seconds.
 * @returns The response from the fetch
 */
export declare const fetchTimeout: (url: RequestInfo | URL, options?: RequestInit, timeout?: number) => Promise<Response>;
