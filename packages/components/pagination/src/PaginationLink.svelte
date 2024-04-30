<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';
	import { page as pageStore } from '$app/stores';
	import { PAGINATION_LINK_PAGE_ATTRIBUTE } from './PaginationNav.svelte';

	export let page: number;
	export let label: string;
	export let disabled = false;
	export let current = false;
	let classes = '';
	export { classes as class };

	const { pageKey } = getInternalPaginationContext();

	// Copy page query to avoid mutating it
	const query = new URLSearchParams($pageStore.url.search);
	query.set(pageKey, `${page}`);
	const href = `?${query.toString()}`;
</script>

<a
	{href}
	aria-label={label}
	aria-current={current ? 'page' : null}
	aria-disabled={disabled ? 'true' : null}
	class={classes}
	data-sveltekit-preload-code="off"
	data-sveltekit-preload-data="off"
	{...{ [PAGINATION_LINK_PAGE_ATTRIBUTE]: page }}
	on:click|preventDefault
>
	<slot />
</a>
