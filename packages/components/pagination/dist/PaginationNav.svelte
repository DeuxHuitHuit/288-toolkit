<script context="module" lang="ts">
	/**
	 * Used to identify pagination links in the click event and to forward the page number
	 */
	export const PAGINATION_LINK_PAGE_ATTRIBUTE = 'data-pagination-link-page';
</script>

<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';
	import { t } from './translations/index.js';
	import { createEventDispatcher } from 'svelte';

	interface $$Events {
		click: CustomEvent<{ page: number }>;
	}

	let classes = '';
	/**
	 * Nav element classes
	 */
	export { classes as class };

	const dispatch = createEventDispatcher();

	const pagination = getInternalPaginationContext();

	const { pages, update, itemsPerPage } = pagination;

	$: itemsTotal = $pages.itemsTotal;

	const onPaginationClick = (e: Event) => {
		const target = e.target as HTMLElement;
		const link = target.closest<HTMLAnchorElement>(`a[${PAGINATION_LINK_PAGE_ATTRIBUTE}]`);
		if (!link) {
			return;
		}
		const page = link.getAttribute(PAGINATION_LINK_PAGE_ATTRIBUTE);
		if (!page) {
			return;
		}
		e.preventDefault();
		const pageNum = Number(page);
		dispatch('click', { page: pageNum });
		update({ page: pageNum });
	};
</script>

{#if pagination && itemsTotal > itemsPerPage}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<nav class={classes} aria-label={t('navLabel')} on:click={onPaginationClick}>
		<slot />
	</nav>
{/if}
