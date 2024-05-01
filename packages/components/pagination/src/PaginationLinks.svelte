<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';
	import { t } from './translations/index.js';
	import PaginationLink from './PaginationLink.svelte';

	interface $$Slots {
		link: { page: number; current: boolean };
		ellipsis: Record<string, never>;
	}

	/**
	 * The number of page links surrounding the current page. DEFAULT: 2
	 */
	export let neighbours = 2;
	/**
	 * Whether to show an ellipsis or not. DEFAULT: true
	 */
	export let ellipsis = true;
	let classes = '';
	/**
	 * Page links classes
	 */
	export { classes as class };
	/**
	 * Ellipses classes
	 */
	export let classEllipsis = '';

	const firstPage = 1;

	const pagination = getInternalPaginationContext();

	const { pages } = pagination;

	const getPages = (current: number) => {
		const prevLinks: number[] = [];
		const nextLinks: number[] = [];
		for (let i = neighbours; i > 0; i--) {
			const page = current - i;
			if (page > 0) {
				prevLinks.push(page);
			}
		}
		for (let i = 1; i <= neighbours; i++) {
			const page = current + i;
			if (page <= lastPage) {
				nextLinks.push(page);
			}
		}
		return [...prevLinks, current, ...nextLinks];
	};

	$: lastPage = $pages.total;
	$: allPages = getPages($pages.current);
</script>

<!-- First -->
{#if $pages.current - neighbours > firstPage}
	<PaginationLink
		page={firstPage}
		label={t('pageNum', { page: firstPage })}
		current={$pages.current === firstPage}
		class={classes}
	>
		<slot name="link" page={firstPage} current={$pages.current === firstPage}>
			{firstPage}
		</slot>
	</PaginationLink>
{/if}
<!-- Ellipsis before current -->
{#if ellipsis && $pages.current - neighbours > firstPage + 1}
	<span aria-hidden="true" class={classEllipsis}>
		<slot name="ellipsis">&hellip;</slot>
	</span>
{/if}
<!-- Links -->
{#each allPages as page (page)}
	<PaginationLink
		{page}
		label={t('pageNum', { page })}
		current={$pages.current === page}
		class={classes}
	>
		<slot name="link" {page} current={$pages.current === page}>
			{page}
		</slot>
	</PaginationLink>
{/each}
<!-- Ellipsis after current -->
{#if ellipsis && $pages.total - $pages.current > neighbours + 1}
	<span aria-hidden="true" class={classEllipsis}>
		<slot name="ellipsis">&hellip;</slot>
	</span>
{/if}
<!-- Last -->
{#if $pages.current + neighbours < lastPage}
	<PaginationLink
		page={lastPage}
		label={t('pageNum', { page: lastPage })}
		current={$pages.current === lastPage}
		class={classes}
	>
		<!--@docs
			##### Slot props
			
			- readonly `page` (`number`): The page number of the link.
		-->
		<slot name="link" page={lastPage} current={$pages.current === lastPage}>
			{lastPage}
		</slot>
	</PaginationLink>
{/if}
