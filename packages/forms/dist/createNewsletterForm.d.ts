/// <reference types=".pnpm/svelte@4.2.17/node_modules/svelte" />
/// <reference types="svelte" />
import type { Maybe } from '@288-toolkit/types';
import { type CreatePostFormOptions } from './createPostForm.js';
export type NewsletterFormOptions = CreatePostFormOptions;
export declare const createNewsletterForm: (options: NewsletterFormOptions) => {
    elements: {
        emailInput: any;
        emailHint: any;
        announcer: any;
        form: any;
        honeypot: any;
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
