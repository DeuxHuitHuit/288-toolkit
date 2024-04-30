/// <reference types="svelte" />
import { tweened } from 'svelte/motion';
export interface SlideOptions {
    open: boolean;
    options?: Parameters<typeof tweened<number>>[1];
    closedHeight?: number;
}
export declare const slide: (node: HTMLElement, { open, options, closedHeight }: SlideOptions) => {
    update: ({ open, options, closedHeight }: SlideOptions) => void;
    destroy: import("svelte/motion").Unsubscriber;
};
