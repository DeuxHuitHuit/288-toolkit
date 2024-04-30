import { getContext, setContext } from 'svelte';
/**
 * Wraps typed versions of Svelte's `getContext` and `setContext` functions with the provided
 * type argument and context key.
 * @param {string} contextKey
 */
export const createTypedContext = (contextKey) => {
    return {
        getContext: () => getContext(contextKey),
        setContext: (context) => setContext(contextKey, context)
    };
};
