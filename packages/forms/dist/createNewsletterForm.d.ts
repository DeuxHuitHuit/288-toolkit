/// <reference types="svelte" />
import type { Maybe } from '@288-toolkit/types';
import { type CreatePostFormOptions } from './createPostForm.js';
export type NewsletterFormOptions = CreatePostFormOptions;
export declare const createNewsletterForm: (options: NewsletterFormOptions) => {
    elements: {
        emailInput: import("@melt-ui/svelte/internal/helpers").MeltElement<[import("svelte/store").Readable<string | string[]>, import("svelte/store").Readable<string>], (node: import("./createValidatedField.js").FieldElement) => {
            destroy: import("svelte/store").Unsubscriber;
        } | undefined, ([value, error]: [string | string[], string]) => {
            type: string;
            name: string;
            value: string | string[];
            'aria-invalid': true | null;
            'aria-describedby': string | null;
        }, "input">;
        emailHint: import("@melt-ui/svelte/internal/helpers").MeltElement<import("svelte/store").Readable<string>, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            id: string;
        }, "hint">;
        announcer: import("@melt-ui/svelte/internal/helpers").MeltElement<import("svelte/store").Stores | undefined, (node: HTMLElement) => {
            destroy: () => void;
        }, () => {
            'aria-live': string;
        }, "newsletter-announcer">;
        form: import("@melt-ui/svelte/internal/helpers").MeltElement<import("svelte/store").Stores | undefined, (node: HTMLFormElement) => {
            destroy: () => void;
        }, (() => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: any) => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: any[]) => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: [any, ...any[]]) => Record<string, any> | ((...args: any[]) => Record<string, any>)), "form">;
        honeypot: import("@melt-ui/svelte/internal/helpers").MeltElement<import("svelte/store").Stores | undefined, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            type: string;
            class: string;
            style: string;
            tabindex: string;
            autocomplete: string;
            name: string;
        }, "hp">;
    };
    helpers: {
        emailError: import("svelte/store").Readable<string>;
        emailValue: import("svelte/store").Readable<string | string[]>;
        submit: () => void;
        data: import("svelte/store").Readable<import("./createPostForm.js").FormData<{
            error?: Maybe<string> | undefined;
        }>>;
        values: import("svelte/store").Readable<import("./createPostForm.js").FormValues>;
        errors: import("svelte/store").Readable<import("./createPostForm.js").FormErrors>;
    };
    states: {
        state: {
            input: ((...args: any[]) => string | symbol) | (((e: Event) => string | symbol) & (() => string));
            submit: ((...args: any[]) => string | symbol) | (((cancel: () => void) => string | symbol) & (() => string) & (() => string));
            reset: ((...args: any[]) => string | symbol) | (() => string);
            error: ((...args: any[]) => string | symbol) | (() => string);
            success: ((...args: any[]) => string | symbol) | (() => string);
        } & {
            subscribe: (callback: (state: "error" | "idle" | "success" | "submitting") => void) => () => void;
        };
    };
};
