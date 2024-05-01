import { createWindowEventStore } from './createWindowEventStore.js';

export const clickUseCapture = createWindowEventStore<PointerEvent>('click', true);
