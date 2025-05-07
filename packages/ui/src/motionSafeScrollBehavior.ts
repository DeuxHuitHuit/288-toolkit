import { prefersReducedMotion } from 'svelte/motion';

/**
 * Returns the appropriate scroll behavior based on the user's preference for reduced motion.
 */
export const motionSafeScrollBehavior = (behavior: ScrollBehavior = 'smooth'): ScrollBehavior => {
	return prefersReducedMotion.current ? 'instant' : behavior;
};
