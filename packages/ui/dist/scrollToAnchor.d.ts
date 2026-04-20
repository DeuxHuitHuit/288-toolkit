/**
 * This action will smoothly scroll to the anchor link's target if it exists while
 * preserving the browser's default behavior.
 * @param node The anchor link
 *
 * @deprecated Use native anchor behavior with css property "scroll-behavior: smooth;" on html instead.
 */
export declare const scrollToAnchor: (node: HTMLAnchorElement) => {
    destroy(): void;
};
