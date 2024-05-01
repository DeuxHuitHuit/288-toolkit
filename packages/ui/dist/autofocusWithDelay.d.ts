import { type Options } from './autofocus.js';
type OptionsWithDelay = Options & {
    delay?: number;
};
/**
 * This action will focus its node on mount or on update after a delay.
 * Please note that adding a delay will change the focus behavior on mobile:
 * we get the visual indicator that the element is focused, but the keyboard
 * will not open automatically.
 * @uses autofocus
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export declare const autofocusWithDelay: (node: HTMLElement, options?: OptionsWithDelay) => {
    update(options: OptionsWithDelay): void;
    destroy(): void;
};
export {};
