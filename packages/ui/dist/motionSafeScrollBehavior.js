import { reducedMotion } from '@288-toolkit/device/media';
import { get } from 'svelte/store';
/**
 * Returns the appropriate scroll behavior based on the user's preference for reduced motion.
 */
export const motionSafeScrollBehavior = (behavior = 'smooth') => {
    return get(reducedMotion) ? 'instant' : behavior;
};
