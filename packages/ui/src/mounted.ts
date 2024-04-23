import { onMount } from 'svelte';

// Credits: https://geoffrich.net/posts/svelte-lifecycle-examples/
// Since this store uses onMount, it can only be used at component initialisation
export const mounted = {
	subscribe(fn: (mounted: boolean) => void) {
		fn(false);
		onMount(() => fn(true));
		return () => {
			/* noop */
		};
	}
};
