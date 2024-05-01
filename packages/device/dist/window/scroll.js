import { createWindowEventStore } from './createWindowEventStore.js';
export const scroll = createWindowEventStore('scroll', { passive: true });
