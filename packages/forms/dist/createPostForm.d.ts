/// <reference types=".pnpm/svelte@4.2.17/node_modules/svelte" />
/// <reference types="svelte" />
import type { AnonymousObject, Maybe } from '@288-toolkit/types';
export type CreatePostFormOptions = {
    /**
     * The delay in milliseconds before the form is reset
     * after a successful submission.
     */
    resetDelay?: Maybe<number>;
    /**
     * The key of the form in the page store. Must be used if there are
     * multiple forms on the page.
     */
    formKey?: Maybe<string>;
    /**
     * Applies the novalidate attribute to the form element, which disables browser validation, only when
     * javascript is enabled.
     */
    novalidate?: boolean;
};
export type FormState = 'idle' | 'submitting' | 'success' | 'error';
export type FormValues = Record<string, string | string[]>;
export type FormErrors = Record<string, string>;
export type FormData<TData extends AnonymousObject = AnonymousObject> = {
    values?: FormValues;
    errors?: FormErrors;
    success?: boolean;
} & TData;
export declare const DEFAULT_RESET_DELAY = 10000;
export declare const createPostForm: <TData extends AnonymousObject>(options?: CreatePostFormOptions) => {
    elements: {
        form: any;
        honeypot: any;
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
    helpers: {
        submit: () => void;
        data: import("svelte/store").Readable<FormData<TData>>;
        values: import("svelte/store").Readable<FormValues>;
        errors: import("svelte/store").Readable<FormErrors>;
    };
};
