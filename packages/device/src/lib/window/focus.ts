import { createWindowEventStore } from './createWindowEventStore.js';

export const focus = createWindowEventStore<FocusEvent>('focus');
