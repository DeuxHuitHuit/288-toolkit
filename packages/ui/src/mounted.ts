import { onMount } from 'svelte';

/**
 * @deprecated Use [`IsMounted`](https://runed.dev/docs/utilities/is-mounted) from Runed instead.
 *
 * Since this store uses onMount, it can only be used at component initialisation.
 * Credits: https://geoffrich.net/posts/svelte-lifecycle-examples/
 */
export const mounted = {
	subscribe(fn: (mounted: boolean) => void) {
		fn(false);
		onMount(() => fn(true));
		return () => {
			/* noop */
		};
	}
};
