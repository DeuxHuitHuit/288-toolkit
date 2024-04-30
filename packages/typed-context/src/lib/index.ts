import { getContext, setContext } from 'svelte';

/**
 * Wraps typed versions of Svelte's `getContext` and `setContext` functions with the provided
 * type argument and context key.
 * @param {string} contextKey
 */
export const createTypedContext = <TContext>(contextKey: string) => {
	return {
		getContext: () => getContext<TContext>(contextKey),
		setContext: (context: TContext) => setContext<TContext>(contextKey, context)
	};
};
