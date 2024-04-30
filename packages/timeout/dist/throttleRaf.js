/**
 * @returns a throttled function that is called at most once per animation frame.
 */
export const throttleRaf = (callback) => {
    let rafId;
    const throttled = (...args) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            callback(...args);
        });
    };
    return throttled;
};
