import { createWindowEventStore } from './createWindowEventStore';

export const click = createWindowEventStore<PointerEvent>('click');
