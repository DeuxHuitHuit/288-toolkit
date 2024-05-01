import { augmentedParallax } from './augmentedParallax.js';
/**
 * @see parallax
 * Adds a scale animation to the basic parallax
 */
export const parallaxScale = augmentedParallax({
    defaults: {
        from: 0.5,
        to: 0.5
    },
    getKeyframes: ({ from, to }) => {
        return {
            transform: [`scale(${from})`, 'scale(1)', `scale(${to})`]
        };
    }
});
