import { ResolvedConfig } from 'vite';
import { Options } from 'svelte-preprocess/dist/types';
import { EventEmitter } from 'events';

type DevReplacerOptions = {
    production: boolean;
};
export declare const whenDev: (options: DevReplacerOptions, e?: EventEmitter) => {
    html: [RegExp, (match: string, devPart: string, prodPart: string, offset: number, code: string) => string];
    js: [RegExp, (match: string, devPart: string, prodPart: string, offset: number, code: string) => string];
};
export declare const ifDev: (options: DevReplacerOptions, e?: EventEmitter) => {
    html: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
    js: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
};
export declare const ifNotDev: (options: DevReplacerOptions, e?: EventEmitter) => {
    html: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
    js: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
};
type DeprecatedReplacerOptions = {
    buildWithDeprecatedApi: boolean;
};
export declare const deprecated: (options: DeprecatedReplacerOptions, e?: EventEmitter) => {
    html: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
    js: [RegExp, (match: string, p1: string, offset: number, code: string) => string];
};
export declare const createReplacers: (options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>, e?: EventEmitter) => ([RegExp, (match: string, devPart: string, prodPart: string, offset: number, code: string) => string] | [RegExp, (match: string, p1: string, offset: number, code: string) => string])[];
type IncludeExcludePatterns = string | RegExp | (string | RegExp)[];
export type SvelteReplacersOptions = {
    include?: IncludeExcludePatterns;
    exclude?: IncludeExcludePatterns;
} & Partial<DevReplacerOptions & DeprecatedReplacerOptions>;
/**
 * A simple reducer to apply the replacers to the code.
 * @param acc The accumulator
 * @param [regex, replacement] The regex and replacement from `createReplacers()`.
 */
export declare const reducer: (acc: string, [regex, replacement]: [RegExp, Exclude<Options.Replace[number][1], string>]) => string;
/**
 * Quick transform function to remove/replace content from production build.
 * Creates the replacers and applies them to the code.
 * @param code The code to transform
 * @param options The options to use
 */
export declare const transform: (code: string, options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>) => string;
/**
 * Svelte replacers plugin for Vite.
 * This plugin allows you to remove/replace content from production build.
 * IMPORTANT: Must be called *before* the sveltekit plugin.
 *
 * @param options - Options for the plugin. Everything is optional.
 * @param options.include - Include patterns
 * @param options.exclude - Exclude patterns
 * @param options.production - Production mode
 * @param options.buildWithDeprecatedApi - Build with deprecated API
 * @returns Vite plugin
 */
export declare const vitePluginSvelteReplacers: (options?: SvelteReplacersOptions) => {
    name: string;
    enforce: "pre";
    configResolved(this: void, config: ResolvedConfig): void;
    transform(this: import('rollup').TransformPluginContext, code: string, id: string, _: {
        ssr?: boolean | undefined;
    } | undefined): string | undefined;
    closeBundle(this: import('rollup').PluginContext): void;
};
export {};
