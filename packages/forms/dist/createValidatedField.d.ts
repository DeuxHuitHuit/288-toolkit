/// <reference types=".pnpm/svelte@4.2.17/node_modules/svelte" />
/// <reference types="svelte" />
import { type Readable } from 'svelte/store';
import type { FormErrors, FormValues } from './createPostForm.js';
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
        input: any;
        hint: any;
    };
    helpers: {
        value: Readable<string | string[]>;
        error: Readable<string>;
    };
};
