import { Plugin } from 'vite';
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
    configResolved(this: void, config: Readonly<Omit<import('vite').UserConfig, "plugins" | "css" | "assetsInclude" | "optimizeDeps" | "worker" | "build"> & {
        configFile: string | undefined;
        configFileDependencies: string[];
        inlineConfig: import('vite').InlineConfig;
        root: string;
        base: string;
        publicDir: string;
        cacheDir: string;
        command: "build" | "serve";
        mode: string;
        isWorker: boolean;
        isProduction: boolean;
        envDir: string;
        env: Record<string, any>;
        resolve: Required<import('vite').ResolveOptions> & {
            alias: import('vite').Alias[];
        };
        plugins: readonly Plugin<any>[];
        css: import('vite').ResolvedCSSOptions;
        esbuild: false | import('vite').ESBuildOptions;
        server: import('vite').ResolvedServerOptions;
        build: import('vite').ResolvedBuildOptions;
        preview: import('vite').ResolvedPreviewOptions;
        ssr: import('vite').ResolvedSSROptions;
        assetsInclude: (file: string) => boolean;
        logger: import('vite').Logger;
        createResolver: (options?: Partial<import('vite').InternalResolveOptions> | undefined) => import('vite').ResolveFn;
        optimizeDeps: import('vite').DepOptimizationOptions;
        worker: import('vite').ResolvedWorkerOptions;
        appType: import('vite').AppType;
        experimental: import('vite').ExperimentalOptions;
    } & import('vite').PluginHookUtils>): void;
    transform(this: import('rollup').TransformPluginContext, code: string, id: string, _: {
        ssr?: boolean | undefined;
    } | undefined): string | undefined;
    closeBundle(this: import('rollup').PluginContext): void;
};
export {};
