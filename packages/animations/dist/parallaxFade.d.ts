/**
 * @see parallax
 * Adds a fade animation to the basic parallax
 */
export declare const parallaxFade: (node: HTMLElement, options?: import("./augmentedParallax").AugmentedParallaxOptions<number>) => {
    destroy: () => void;
    update: (options?: import("./parallax").ParallaxOptions | undefined) => void;
};
