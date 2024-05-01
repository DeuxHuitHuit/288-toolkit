import { createWindowEventStore } from './createWindowEventStore.js';

export const pointerdown = createWindowEventStore<PointerEvent>('pointerdown');
