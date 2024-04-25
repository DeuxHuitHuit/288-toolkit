export declare const INLINE_SVELTE_ID = "virtual:inline-svelte:";
export declare const svelteInlineComponent: () => {
    name: string;
    enforce: string;
    resolveId(id: string): string | undefined;
    load(id: string): string | undefined;
};
