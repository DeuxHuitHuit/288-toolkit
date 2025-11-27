/**
 * Removes duplicates from an array of values
 * @param arr
 * @returns a new array with the duplicates removed
 */
export const dedupeArray = (arr) => {
    return [...new Set(arr)];
};
/**
 * Removes duplicates from an array of objects based on the value of a key
 * @param arr The array to remove the duplicates from
 * @param filterKey The filter key in case of array of objects
 * @returns the filtered array
 */
export const dedupeArrayOfObjects = (arr, filterKey) => {
    return [...new Map(arr.filter(Boolean).map((a) => [a[filterKey], a])).values()];
};
