/**
 * Batch multiple functions into one.
 * @param fns
 * @returns  A single function that calls all functions passed as arguments.
 */
export const runCallbacks =
	(...fns: (() => void | undefined | null)[]) =>
	() => {
		fns.forEach((fn) => {
			if (typeof fn === 'function') {
				fn();
			}
		});
	};
