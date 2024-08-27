<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';

	/**
	 * The intersection observer threshold, at which the component starts loading
	 * the next items. Default: 0.5.
	 */
	export let threshold: IntersectionObserverInit['threshold'] = 0.5;

	const pagination = getInternalPaginationContext();

	const { pages, update, hasMore, setKeepItems } = pagination;

	setKeepItems();

	$: nextPage = $pages.next;

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

{#if pagination && $hasMore}
	<div style="height: 100vh;" use:setup />
{/if}
