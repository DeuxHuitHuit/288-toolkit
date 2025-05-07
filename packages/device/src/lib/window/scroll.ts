import { createWindowEventStore } from './createWindowEventStore.js';

/**
 * @deprecated Use [`on()`](https://svelte.dev/docs/svelte/svelte-events#on) instead.
 */
export const scroll = createWindowEventStore('scroll', { passive: true });
