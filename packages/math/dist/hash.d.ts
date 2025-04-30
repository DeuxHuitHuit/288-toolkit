/**
 * Create a hash of a string
 * @param str - The string to hash
 * @param algorithm - The algorithm to use, defaults to 'SHA-1'
 */
export declare const hash: (str: string, algorithm?: AlgorithmIdentifier) => Promise<any>;
