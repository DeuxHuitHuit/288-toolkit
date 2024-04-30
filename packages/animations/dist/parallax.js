import { reducedMotion } from '@288-toolkit/device/media';
import { animate, scroll } from 'motion';
import { get } from 'svelte/store';
export const DEFAULT_SPEED = 0.2;
export const DEFAULT_EASING = 'linear';
export const DEFAULT_EXTRA_KEYFRAMES = {};
const getOptions = (options) => {
    return {
        speed: options?.speed ?? DEFAULT_SPEED,
        easing: options?.easing || DEFAULT_EASING,
        keyframes: options?.keyframes || DEFAULT_EXTRA_KEYFRAMES
    };
};
const initParallax = ({ node, speed, easing, keyframes }) => {
    if (speed === 0 || get(reducedMotion)) {
        return null;
    }
    const translateY = speed * 100;
    return scroll(animate(node, {
        ...keyframes,
        transform: [
            `translate3d(0,${-translateY}%,0) ${keyframes?.transform?.[0] || ''}`.trim(),
            `translate3d(0,0,0) ${keyframes?.transform?.[1] || ''}`.trim(),
            `translate3d(0,${translateY}%,0) ${keyframes?.transform?.[2] || ''}`.trim()
        ]
    }, {
        easing
    }), {
        target: node,
        offset: ['start end', 'center center', 'end start']
    });
};
/**
 * Creates a parallax effect on an element. The parallax will be re-initialized when the options change.
 */
export const parallax = (node, options) => {
    let stop = initParallax({ node, ...getOptions(options) });
    return {
        destroy: () => {
            stop?.();
        },
        update: (options) => {
            stop?.();
            stop = initParallax({ node, ...getOptions(options) });
        }
    };
};
