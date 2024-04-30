export type PortalTarget = HTMLElement | string;
/**
 * Renders an element in a different part of the DOM.
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 *
 * Based on https://github.com/romkor/svelte-portal/tree/master
 */
export declare const portal: (node: HTMLElement, target?: PortalTarget) => {
    update: (newTarget: PortalTarget) => Promise<void>;
    destroy: () => void;
};
