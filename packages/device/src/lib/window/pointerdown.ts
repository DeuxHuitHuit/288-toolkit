import { createWindowEventStore } from './createWindowEventStore';

export const pointerdown = createWindowEventStore<PointerEvent>('pointerdown');
