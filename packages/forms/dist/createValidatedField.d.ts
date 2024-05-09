/// <reference types="svelte" />
import { type Readable } from 'svelte/store';
import type { FormErrors, FormValues } from './createPostForm';
export type FieldOptions = {
    /**
     * The type of the input element. DEFAULT: 'text'
     */
    type?: string;
    /**
     * The name of the field. This is used to access the value and error of the field.
     */
    name: string;
    /**
     * A readable store containing the errors of the form.
     */
    errors: Readable<FormErrors>;
    /**
     * A readable store containing the values of the form.
     */
    values: Readable<FormValues>;
    /**
     * If true, the field will be focused when an error is set. DEFAULT: true
     */
    focusOnError?: boolean;
};
export type FieldElement = HTMLInputElement | HTMLTextAreaElement;
export type ValidatedField = ReturnType<typeof createValidatedField>;
export declare const DEFAULT_TYPE = "text";
export declare const createValidatedField: (options: FieldOptions) => {
    elements: {
        input: import("@melt-ui/svelte/internal/helpers").MeltElement<[Readable<string | string[]>, Readable<string>], (node: FieldElement) => {
            destroy: import("svelte/store").Unsubscriber;
        } | undefined, ([value, error]: [string | string[], string]) => {
            type: string;
            name: string;
            value: string | string[];
            'aria-invalid': true | null;
            'aria-describedby': string | null;
        }, "input">;
        hint: import("@melt-ui/svelte/internal/helpers").MeltElement<Readable<string>, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            id: string;
        }, "hint">;
    };
    helpers: {
        value: Readable<string | string[]>;
        error: Readable<string>;
    };
};
