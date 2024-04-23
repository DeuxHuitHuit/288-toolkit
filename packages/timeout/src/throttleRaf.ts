/**
 * @returns a throttled function that is called at most once per animation frame.
 */
export const throttleRaf = <T extends (...args: unknown[]) => void>(callback: T) => {
	let rafId: number;
	const throttled = (...args: unknown[]) => {
		cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			callback(...args);
		});
	};
	return throttled as T;
};
