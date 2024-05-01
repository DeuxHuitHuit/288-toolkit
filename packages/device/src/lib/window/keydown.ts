import { createWindowEventStore } from './createWindowEventStore.js';

export const keydown = createWindowEventStore<KeyboardEvent>('keydown');
