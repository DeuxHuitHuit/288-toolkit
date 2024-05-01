/**
 * Creates an expirable version of a value.
 * @param value T: any value you want to expire after ttl
 * @param ttl number: the time to live, in seconds, for the data
 * @returns () => T: a function that returns the value if it is not expired
 */
export declare const expirable: <T>(value: T, ttl: number) => () => T | null;
