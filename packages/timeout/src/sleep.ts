/**
 * Resolves a promise after a given time.
 */
export const sleep = (time: number) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};
export default sleep;
