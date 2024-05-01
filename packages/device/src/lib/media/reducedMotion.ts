import { createMatchMediaStore } from './createMatchMediaStore.js';

/**
 * A readable store that returns whether the user has requested reduced motion.
 */
export const reducedMotion = createMatchMediaStore('(prefers-reduced-motion)');
