import { randomIndex } from './randomItem.js';

/**
 * Creates a shuffled copy of an array.
 *
 * @see randomInt
 * @param arr The array to shuffle
 */
export const shuffleArray = <T>(arr: readonly T[]) => {
	const copy = [...arr];
	if (arr.length < 2) {
		return copy;
	}
	return arr.map(() => {
		// Get a random index and remove the item at that index
		const rand = randomIndex(copy);
		const [item] = copy.splice(rand, 1);
		return item;
	});
};
