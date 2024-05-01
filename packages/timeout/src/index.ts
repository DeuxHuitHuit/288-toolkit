import _debounce from 'just-debounce-it';
import _throttle from 'just-throttle';

export * from './interval.js';
export * from './sleep.js';
export * from './throttleRaf.js';

export const throttle = _throttle;
export const debounce = _debounce;
