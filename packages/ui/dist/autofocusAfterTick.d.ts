import type { Options } from './autofocus';
/**
 * This action will focus its node on mount and on update after `tick()` resolves.
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export declare const autofocusAfterTick: (node: HTMLElement, options?: Options) => {
    update(options: Options): void;
};
