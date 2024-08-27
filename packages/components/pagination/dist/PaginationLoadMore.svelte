<script lang="ts">
	import PaginationLink from './PaginationLink.svelte';
	import { getInternalPaginationContext } from './Pagination.svelte';
	import { t } from './translations/index.js';

	let classes = '';
	/**
	 * Optional link classes
	 */
	export { classes as class };

	const pagination = getInternalPaginationContext();

	const { pages, update, setKeepItems, updateUrl } = pagination;

	setKeepItems();

	const onLoadMoreClick = () => {
		update({ page: Number($pages.next) });
	};

	const label = t('loadMore');
</script>

{#if pagination}
	{#if updateUrl}
		<PaginationLink {label} page={$pages.next} class={classes} on:click={onLoadMoreClick}>
			<slot {label}>
				{label}
			</slot>
		</PaginationLink>
	{:else}
		<button type="button" class={classes} on:click={onLoadMoreClick}>
			<slot {label}>
				{label}
			</slot>
		</button>
	{/if}
{/if}
