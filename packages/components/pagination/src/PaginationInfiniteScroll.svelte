<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';

	/**
	 * The intersection observer threshold, at which the component starts loading
	 * the next items. Default: 0.5.
	 */
	export let threshold: IntersectionObserverInit['threshold'] = 0.5;

	const pagination = getInternalPaginationContext();

	const { pages, update, itemsPerPage, setKeepItems } = pagination;

	setKeepItems();

	$: nextPage = $pages.next;
	$: pagesTotal = $pages.total;
	$: itemsTotal = $pages.itemsTotal;
	$: done = itemsTotal <= itemsPerPage || nextPage > pagesTotal;

	const onScroll: IntersectionObserverCallback = ([entry]) => {
		if (entry.isIntersecting) {
			update({ page: Number(nextPage) });
		}
	};

	const setup = (node: HTMLElement) => {
		const observer = new IntersectionObserver(onScroll, {
			threshold
		});
		observer.observe(node);

		return {
			destroy: () => {
				observer.disconnect();
			}
		};
	};
</script>

{#if pagination}
	<!--@docs
			##### Slot props
			
			- readonly `done` (`boolean`): Wether there are more items to load or not.
		-->
	<slot {done} />
	{#if !done}
		<div style="height: 100vh;" use:setup />
	{/if}
{/if}
