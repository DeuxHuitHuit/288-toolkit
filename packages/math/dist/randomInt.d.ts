/**
 * Get a random integer between two integers.
 * The given range includes both the min and the max.
 * Asking for (1, 6) will simulate a d6 and (0, array.length - 1) will return a correct index.
 * If the range is negative, the min and max will be swapped.
 *
 * This function tries to not be biased, by rejecting values that would cause a non-uniform distribution.
 * @see @link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export declare const randomInt: (min: number, max: number) => number;
