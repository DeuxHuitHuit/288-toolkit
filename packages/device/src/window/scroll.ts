import { createWindowEventStore } from './createWindowEventStore';

export const scroll = createWindowEventStore('scroll', { passive: true });
