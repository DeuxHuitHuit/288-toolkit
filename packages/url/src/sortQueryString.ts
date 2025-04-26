/**
 * Sort the query string of a URL
 * @param url - The URL to sort the query string of
 * @param ignoredKeys - The query string parameters to ignore
 * @returns The URL with the sorted query string
 */
export const sortQueryString = (url: URL, ignoredKeys: string[] = []) => {
	const parsedQs = new URLSearchParams(url.searchParams);

	const result = new URLSearchParams();
	const sortedKeys = Array.from(parsedQs.keys()).sort();
	for (const key of sortedKeys) {
		if (!ignoredKeys.includes(key)) {
			result.set(key, parsedQs.get(key) ?? '');
		}
	}

	url.search = result.toString();

	return url;
};