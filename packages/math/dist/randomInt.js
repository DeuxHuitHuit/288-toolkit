/**
 * Get a random integer between two integers.
 * The given range includes both the min and the max.
 * Asking for (1, 6) will simulate a d6 and (0, array.length - 1) will return a correct index.
 * If the range is negative, the min and max will be swapped.
 *
 * This function tries to not be biased, by rejecting values that would cause a non-uniform distribution.
 * @see @link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const randomInt = (min, max) => {
    min = ~~min;
    max = ~~max;
    if (min == max) {
        return min;
    }
    // If the min and max are swapped, swap them back
    if (min > max) {
        [min, max] = [max, min];
    }
    const range = max - min;
    const sign = Math.sign(range);
    const absRange = Math.abs(range);
    const precision = absRange.toString().length;
    const upperBound = 10 ** precision;
    let rand = 0;
    // Reject values that would cause a non-uniform distribution (i.e it overflows the range)
    do {
        rand = ~~(Math.random() * upperBound);
    } while (rand > absRange);
    return sign * (rand + min);
};
