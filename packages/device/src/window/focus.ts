import { createWindowEventStore } from './createWindowEventStore';

export const focus = createWindowEventStore<FocusEvent>('focus');
