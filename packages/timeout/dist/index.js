import _debounce from 'just-debounce-it';
import _throttle from 'just-throttle';
export * from './interval';
export * from './sleep';
export * from './throttleRaf';
export const throttle = _throttle;
export const debounce = _debounce;
