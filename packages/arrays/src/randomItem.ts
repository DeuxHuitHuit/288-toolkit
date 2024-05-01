import { randomInt } from '@288-toolkit/math';

/**
 * Returns a random index from an array with a random uniform distribution.
 * @see randomInt
 * @param arr The array to get a random index from
 */
export const randomIndex = <T>(arr: readonly T[]) => randomInt(0, arr.length - 1);

/**
 * Returns a random item from an array with a random uniform distribution.
 * @see randomInt
 * @param arr The array to get a random item from
 */
export const randomItem = <T>(arr: readonly T[]) => arr[randomIndex(arr)];
