import { parallax } from './parallax';
const toParallaxOptions = (options, getKeyframes) => {
    return {
        speed: options.speed,
        easing: options.easing,
        keyframes: getKeyframes({ from: options.from, to: options.to })
    };
};
/**
 * @see parallax
 * Convenience function to augment the basic `parallax` action with more animation effects.
 */
export const augmentedParallax = ({ defaults, getKeyframes }) => {
    return (node, options = {}) => {
        const from = typeof options.from !== 'undefined' ? options.from : defaults.from;
        const to = typeof options.to !== 'undefined' ? options.to : defaults.to;
        return parallax(node, toParallaxOptions({
            ...options,
            from,
            to
        }, getKeyframes));
    };
};
