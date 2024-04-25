import { Plugin } from 'vite';
import { TemplateParamsArray } from '@288-toolkit/strings';

export declare const INLINE_SVELTE_ID = "virtual:inline-svelte:";
export declare const svelteInlineComponent: () => Plugin;
/**
 * Convert svelte component base64 string and import it from memory
 */
export declare const svelte: (t: TemplateStringsArray, ...s: TemplateParamsArray) => Promise<any>;
/**
 * Convert svelte component base64 string and import it from memory
 */
export declare const html: (t: TemplateStringsArray, ...s: TemplateParamsArray) => Promise<any>;
