/**
 * @see parallax
 * Adds a scale animation to the basic parallax
 */
export declare const parallaxScale: (node: HTMLElement, options?: import("./augmentedParallax").AugmentedParallaxOptions<number>) => {
    destroy: () => void;
    update: (options?: import("./parallax").ParallaxOptions | undefined) => void;
};
