/**
 * Fetch with a timeout
 * @param url - The URL to fetch
 * @param options - The options for the fetch
 * @param timeout - The timeout in milliseconds. Defaults to 20 seconds.
 * @returns The response from the fetch
 */
export const fetchTimeout = async (url, options = {}, timeout = 20000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        return fetch(url, { ...options, signal: controller.signal });
    }
    finally {
        clearTimeout(timeoutId);
    }
};
