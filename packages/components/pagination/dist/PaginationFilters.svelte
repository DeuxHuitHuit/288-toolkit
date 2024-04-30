<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte';

	const CONTEXT_KEY = '__pagination-filters__';

	type FilterFn = () => void;

	type PaginationFiltersApi = {
		filter: FilterFn;
		activeFilters: Readable<ActiveFilters>;
	};

	export const getPaginationFiltersContext = () => getContext<PaginationFiltersApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import {
		getInternalPaginationContext,
		type ActiveFilters,
		type PaginationInternalApi
	} from './Pagination.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { t } from './translations';
	import { derived, type Readable } from 'svelte/store';
	import { requestSubmit } from '@288-toolkit/forms';
	import { mounted } from '@288-toolkit/ui';

	type EventDetail = { event: Event };

	interface $$Events {
		filter: CustomEvent<EventDetail>;
		reset: CustomEvent<EventDetail>;
	}

	interface $$Slots {
		submit: Record<string, never>;
		default: {
			filter: FilterFn;
			activeFilters: ActiveFilters;
		};
	}

	let classes = '';
	/**
	 * Optional form classes
	 */
	export { classes as class };

	const dispatch = createEventDispatcher<{ filter: EventDetail; reset: EventDetail }>();

	const { pathname } = $page.url;

	const pagination = getInternalPaginationContext();

	const { setInitialFilters, update, pages, pageKey } = pagination;

	let form: HTMLFormElement;

	const onFilter = (e: Event) => {
		const filterNames = Array.from(form.elements)
			.filter((el) => !!el.getAttribute('name'))
			.map((el) => el.getAttribute('name') || '');
		const dedupedNames = Array.from(new Set(filterNames));
		const formData = new FormData(form);
		const filters = dedupedNames.reduce((obj, name) => {
			const value = formData.getAll(name).filter(Boolean);
			obj[name] = value.length > 0 ? value : null;
			return obj;
		}, {});
		update({ filters });
		dispatch('filter', { event: e });
	};

	const onReset = (e: Event) => {
		const filters = Object.entries($pages.filters)
			.filter(([key]) => form?.elements?.[key])
			.reduce((obj, [key]) => {
				obj[key] = [];
				return obj;
			}, {});
		update({ filters });
		dispatch('reset', { event: e });
	};

	const clearFilter = (filterKey: string, filterSlug: string) => {
		const processedFilterValue =
			$pages.filters[filterKey]?.filter((slug) => slug !== filterSlug) || [];
		update({
			filters: {
				[filterKey]: processedFilterValue
			}
		});
	};

	const submit = () => requestSubmit(form);

	const activeFilters = derived<PaginationInternalApi['pages'], ActiveFilters>(pages, (p) => {
		return Object.entries(p.filters)
			.filter(([key, value]) => !!value && !!form?.elements?.[key])
			.map(([key, values]) => {
				return values.map((value) => {
					return {
						key,
						value,
						clear: () => clearFilter(key, value)
					};
				});
			})
			.flat();
	});

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const initialFiltersValues = Array.from(searchParams.keys()).reduce((obj, key) => {
			if (!form?.elements?.[key] || key === pageKey) {
				return obj;
			}
			const existingKey = obj[key];
			if (existingKey) {
				return obj;
			}
			const value = searchParams.getAll(key).filter(Boolean);
			if (!value.filter(Boolean).length) {
				return obj;
			}
			obj[key] = value;
			return obj;
		}, {});

		setInitialFilters(initialFiltersValues);
	});

	setContext(CONTEXT_KEY, {
		activeFilters,
		filter: submit
	});
</script>

{#if pagination}
	<form
		class={classes}
		method="get"
		action={pathname}
		bind:this={form}
		on:reset={onReset}
		on:submit|preventDefault={onFilter}
	>
		<!--@docs
		##### Slot props

		Also available in context via the exported `getPaginationFiltersContext` function.

		-   readonly `activeFilters` (`{ key: string; value: string; clear: () => void }[]`): An array
		of all the currently selected filter values. Each value is an object containing the filter
		group `key` (corresponding to the `name` attribute of the filter input), the `value` (the
		currently selected value) and a `clear` function to clear the value from the active filters.
		-   readonly `filter` (`() => void`): A function to submit the filters form. This will trigger a
		call the `getItems` function with the updated filters and update the items.
	-->
		<slot activeFilters={$activeFilters} filter={submit} />
		{#if !$mounted}
			<slot name="submit">
				<button type="submit">{t('filter')}</button>
			</slot>
		{/if}
	</form>
{/if}
