import { autofocus } from './autofocus';
/**
 * This action will focus its node on mount or on update after a delay.
 * Please note that adding a delay will change the focus behavior on mobile:
 * we get the visual indicator that the element is focused, but the keyboard
 * will not open automatically.
 * @uses autofocus
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export const autofocusWithDelay = (node, options = { canFocus: true, delay: 0 }) => {
    let timeout;
    // Create the focus action
    const focus = autofocus(node, {
        // Disable focus on mount
        canFocus: false
    });
    // Delay update
    const delayFocus = (options) => {
        // Clear previous timeout
        clearTimeout(timeout);
        // Update after the delay
        timeout = setTimeout(() => focus.update(options), options?.delay);
    };
    // Start the delay
    delayFocus(options);
    return {
        update(options) {
            delayFocus(options);
        },
        destroy() {
            clearTimeout(timeout);
        }
    };
};
