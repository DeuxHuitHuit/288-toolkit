import { augmentedParallax } from './augmentedParallax.js';
/**
 * @see parallax
 * Adds a fade animation to the basic parallax
 */
export const parallaxFade = augmentedParallax({
    defaults: {
        from: 1,
        to: 0
    },
    getKeyframes: ({ from, to }) => {
        return {
            opacity: [from, 1, to]
        };
    }
});
