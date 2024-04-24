import { createWindowEventStore } from './createWindowEventStore';

export const focusin = createWindowEventStore<FocusEvent>('focusin');
