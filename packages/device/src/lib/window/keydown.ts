import { createWindowEventStore } from './createWindowEventStore';

export const keydown = createWindowEventStore<KeyboardEvent>('keydown');
