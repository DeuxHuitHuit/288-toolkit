import { tick } from 'svelte';
/**
 * This action will focus its node on mount and on update after `tick()` resolves.
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export const autofocusAfterTick = (node, options = { canFocus: true }) => {
    const focus = (options) => {
        // undefined should act as the default, which is true
        if (options?.canFocus !== false) {
            tick().then(() => {
                node?.focus(options);
            });
        }
    };
    focus(options);
    return {
        update(options) {
            focus(options);
        }
    };
};
