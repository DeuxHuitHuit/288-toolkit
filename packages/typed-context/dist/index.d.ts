/**
 * Wraps typed versions of Svelte's `getContext` and `setContext` functions with the provided
 * type argument and context key.
 * @param {string} contextKey
 */
export declare const createTypedContext: <TContext>(contextKey: string) => {
    getContext: () => TContext;
    setContext: (context: TContext) => TContext;
};
