type Options = ScrollIntoViewOptions & {
    canScroll?: boolean;
};
/**
 * This action will scroll the element into view on mount.
 * @param node The HTMLElement to scroll into view
 * @param options The options to pass to the scrollIntoView method
 */
export declare const scrollIntoView: (node: HTMLElement, options?: Options) => {
    update: (newOptions: Options) => void;
};
export {};
