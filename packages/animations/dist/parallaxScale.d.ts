/**
 * @see parallax
 * Adds a scale animation to the basic parallax
 */
export declare const parallaxScale: (node: HTMLElement, options?: import("./augmentedParallax.js").AugmentedParallaxOptions<number>) => {
    destroy: () => void;
    update: (options?: import("./parallax.js").ParallaxOptions | undefined) => void;
};
