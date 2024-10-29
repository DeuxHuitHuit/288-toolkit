/// <reference types="svelte" />
import { type ChangeFn } from '../../internal/helpers/index.js';
import type { MeltActionReturn } from '../../internal/types.js';
import type { AccordionEvents } from './events.js';
import type { AccordionHeadingProps, AccordionItemProps, CreateAccordionProps } from './types.js';
export declare const createAccordion: <Multiple extends boolean = false>(props?: CreateAccordionProps<Multiple> | undefined) => {
    ids: {
        [x: string]: string;
    };
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<import("svelte/store").Stores | undefined, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            readonly 'data-melt-id': string;
        }, string>;
        item: import("../../internal/helpers/index.js").MeltElement<{
            update: (updater: import("svelte/store").Updater<string | string[] | undefined>, sideEffect?: ((newValue: string | string[] | undefined) => void) | undefined) => void;
            set: (this: void, value: string | string[] | undefined) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string | string[] | undefined>, invalidate?: import("svelte/store").Invalidator<string | string[] | undefined> | undefined): import("svelte/store").Unsubscriber;
            get: () => string | string[] | undefined;
            destroy?: (() => void) | undefined;
        }, import("svelte/action").Action<any, any, Record<never, any>>, ($value: string | string[] | undefined) => (props: AccordionItemProps) => {
            readonly 'data-state': "open" | "closed";
            readonly 'data-disabled': true | undefined;
        }, string>;
        trigger: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<string | string[] | undefined>, sideEffect?: ((newValue: string | string[] | undefined) => void) | undefined) => void;
            set: (this: void, value: string | string[] | undefined) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string | string[] | undefined>, invalidate?: import("svelte/store").Invalidator<string | string[] | undefined> | undefined): import("svelte/store").Unsubscriber;
            get: () => string | string[] | undefined;
            destroy?: (() => void) | undefined;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => MeltActionReturn<AccordionEvents['trigger']>, ([$value, $disabled]: [string | string[] | undefined, boolean]) => (props: AccordionItemProps) => {
            readonly disabled: true | undefined;
            readonly 'aria-expanded': boolean;
            readonly 'aria-disabled': boolean;
            readonly 'data-disabled': true | undefined;
            readonly 'data-value': string;
            readonly 'data-state': "open" | "closed";
        }, string>;
        content: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<string | string[] | undefined>, sideEffect?: ((newValue: string | string[] | undefined) => void) | undefined) => void;
            set: (this: void, value: string | string[] | undefined) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<string | string[] | undefined>, invalidate?: import("svelte/store").Invalidator<string | string[] | undefined> | undefined): import("svelte/store").Unsubscriber;
            get: () => string | string[] | undefined;
            destroy?: (() => void) | undefined;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => void, ([$value, $disabled, $forceVisible]: [string | string[] | undefined, boolean, boolean]) => (props: AccordionItemProps) => {
            readonly 'data-state': "open" | "closed";
            readonly 'data-disabled': true | undefined;
            readonly 'data-value': string;
            readonly hidden: true | undefined;
            readonly style: string | undefined;
        }, string>;
        heading: import("../../internal/helpers/index.js").MeltElement<import("svelte/store").Stores | undefined, import("svelte/action").Action<any, any, Record<never, any>>, () => (props: AccordionHeadingProps) => {
            readonly role: "heading";
            readonly 'aria-level': number;
            readonly 'data-heading-level': number;
        }, string>;
    };
    states: {
        value: import("svelte/store").Writable<import("../../internal/types.js").WhenTrue<Multiple, string[], string, string | string[]> | undefined>;
    };
    helpers: {
        isSelected: import("svelte/store").Readable<(key: string) => boolean>;
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        multiple: false | Multiple;
        disabled: boolean;
        forceVisible: boolean;
        defaultValue?: import("../../internal/types.js").WhenTrue<Multiple, string[], string, string | string[]> | undefined;
        value?: import("svelte/store").Writable<import("../../internal/types.js").WhenTrue<Multiple, string[], string, string | string[]> | undefined> | undefined;
        onValueChange?: ChangeFn<import("../../internal/types.js").WhenTrue<Multiple, string[], string, string | string[]> | undefined> | undefined;
    }, "value" | "onValueChange" | "defaultValue">>;
};
