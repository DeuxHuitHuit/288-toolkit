/**
 * Removes duplicates from an array of values
 * @param arr
 * @returns a new array with the duplicates removed
 */
export declare const dedupeArray: <T extends string | number | boolean | symbol>(arr: readonly T[]) => T[];
/**
 * Removes duplicates from an array of objects based on the value of a key
 * @param arr The array to remove the duplicates from
 * @param filterKey The filter key in case of array of objects
 * @returns the filtered array
 */
export declare const dedupeArrayOfObjects: <T extends Record<string | number | symbol, unknown>>(arr: readonly T[], filterKey: string) => T[];
