import { createMatchMediaStore } from './createMatchMediaStore.js';

/**
 * @deprecated Use [`prefersReducedMotion`](https://svelte.dev/docs/svelte/svelte-motion#prefersReducedMotion) from Svelte instead.
 *
 * A readable store that returns whether the user has requested reduced motion.
 */
export const reducedMotion = createMatchMediaStore('(prefers-reduced-motion)');
