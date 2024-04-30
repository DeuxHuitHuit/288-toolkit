export type Options = FocusOptions & {
    canFocus?: boolean;
};
/**
 * This action will focus its node on mount and on update.
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export declare const autofocus: (node: HTMLElement, options?: Options) => {
    update(options: Options): void;
};
