/**
 * Create a hash of a string
 * @param str - The string to hash
 * @param algorithm - The algorithm to use, defaults to 'SHA-1'
 */
export const hash = async (str: string, algorithm: AlgorithmIdentifier = 'SHA-1') => {
	// Crypto outputs a binary buffer
	const buf = await crypto.subtle.digest(algorithm, new TextEncoder().encode(str));
	// This weird ass line converts it back to a string by mapping bytes into a string array, then joins
	return Array.prototype.map
		.call(new Uint8Array(buf), (x: number) => ('00' + x.toString(16)).slice(-2))
		.join('');
};
