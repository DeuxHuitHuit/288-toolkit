import { createWindowEventStore } from './createWindowEventStore';

export const clickUseCapture = createWindowEventStore<PointerEvent>('click', true);
