/**
 * Linear interpolation function that returns a point between two bounds derived from a value
 * between two other bounds. It makes sure to not divide or multiply by zero.
 *
 * x1 and x2 are the target bounds.
 * y1 and y2 are the two bounds between which the new value should be found.
 * Target is the point between to bounds from which we derive a new value.
 */
export const lerp = (x1: number, x2: number, y1: number, y2: number, target: number) => {
	if (x1 === x2) {
		return y1;
	}
	if (y1 === y2) {
		return y1;
	}
	return ((target - x1) * (y2 - y1)) / (x2 - x1) + y1;
};
