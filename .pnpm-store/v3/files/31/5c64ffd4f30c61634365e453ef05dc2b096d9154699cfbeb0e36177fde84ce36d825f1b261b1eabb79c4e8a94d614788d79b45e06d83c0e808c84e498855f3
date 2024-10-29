/// <reference types="svelte" />
import type { Action } from 'svelte/action';
export declare function copyText(text: string): Promise<void>;
interface Parameters {
    text: string;
    events?: string | string[];
}
interface Attributes {
    'on:svelte-copy': (event: CustomEvent<string>) => void;
    'on:svelte-copy:error': (event: CustomEvent<Error>) => void;
}
export declare const copy: Action<HTMLElement, Parameters | string, Attributes>;
export {};
