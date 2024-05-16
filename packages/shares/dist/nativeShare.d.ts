/// <reference types="svelte" />
import type { MaybeUndefined } from '@288-toolkit/types';
import type { ActionReturn } from 'svelte/action';
type Attributes = {
    'on:nativesharesunsupported'?: (e: CustomEvent<{
        node: HTMLButtonElement;
    }>) => void;
};
/**
 * Svelte action that adds a click event listener to the node that calls the native share API.
 */
export declare const nativeShare: (node: HTMLButtonElement) => MaybeUndefined<ActionReturn<never, Attributes>>;
export {};
