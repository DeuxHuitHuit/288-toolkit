import { focusableSelector } from './focusableSelector.js';
/**
 * Returns true if the given element is focusable.
 */
export const isFocusable = (element) => {
    return !!element?.closest(focusableSelector);
};
