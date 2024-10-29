/// <reference types="svelte" />
import type { MeltActionReturn } from '../../internal/types.js';
import { type Writable } from 'svelte/store';
import type { TreeEvents } from './events.js';
import type { CreateTreeViewProps } from './types.js';
export declare function createTreeView(args?: CreateTreeViewProps): {
    ids: {
        [x: string]: string;
    };
    elements: {
        tree: import("../../internal/helpers/index.js").MeltElement<import("svelte/store").Stores | undefined, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            readonly role: "tree";
            readonly 'data-melt-id': string;
        }, string>;
        item: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<string[]>, sideEffect?: ((newValue: string[]) => void) | undefined) => void;
            set: (this: void, value: string[]) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string[]>, invalidate?: import("svelte/store").Invalidator<string[]> | undefined): import("svelte/store").Unsubscriber;
            get: () => string[];
            destroy?: (() => void) | undefined;
        }, import("svelte/store").Readable<string | null | undefined>, Writable<string | null>], (node: HTMLElement) => MeltActionReturn<TreeEvents['item']>, ([$expanded, $selectedId, $lastFocusedId]: [string[], string | null | undefined, string | null]) => (opts: {
            id: string;
            hasChildren?: boolean;
        }) => {
            readonly role: "treeitem";
            readonly 'aria-selected': boolean;
            readonly 'data-id': string;
            readonly tabindex: number;
            readonly 'aria-expanded': boolean | undefined;
        }, string>;
        group: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<string[]>, sideEffect?: ((newValue: string[]) => void) | undefined) => void;
            set: (this: void, value: string[]) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string[]>, invalidate?: import("svelte/store").Invalidator<string[]> | undefined): import("svelte/store").Unsubscriber;
            get: () => string[];
            destroy?: (() => void) | undefined;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$expanded]: [string[]]) => (opts: {
            id: string;
        }) => {
            readonly role: "group";
            readonly 'data-group-id': string;
            readonly hidden: true | undefined;
            readonly style: string;
        }, string>;
    };
    states: {
        expanded: {
            update: (updater: import("svelte/store").Updater<string[]>, sideEffect?: ((newValue: string[]) => void) | undefined) => void;
            set: (this: void, value: string[]) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string[]>, invalidate?: import("svelte/store").Invalidator<string[]> | undefined): import("svelte/store").Unsubscriber;
            get: () => string[];
            destroy?: (() => void) | undefined;
        };
        selectedItem: Writable<HTMLElement | null>;
    };
    helpers: {
        isExpanded: import("svelte/store").Readable<(itemId: string) => boolean>;
        isSelected: import("svelte/store").Readable<(itemId: string) => boolean>;
    };
};
