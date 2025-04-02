<script lang="ts" context="module">
	import { createTypedContext } from '@288-toolkit/typed-context';
	import { readonly, type Readable } from 'svelte/store';

	export type PaginationState = 'idle' | 'loading' | 'error';
	export type Filters = Record<string, string[]>;
	export type ActiveFilter = {
		key: string;
		value: string;
		clear: () => void;
	};
	export type ActiveFilters = ActiveFilter[];
	export type Offset = number;

	export type UpdateArgs = { page?: number; filters?: Filters };

	export interface PagesStore {
		current: number;
		prev: number;
		next: number;
		total: number;
		itemsTotal: number;
		filters: Filters;
	}

	export interface PaginationInternalApi {
		update: (params: UpdateArgs) => void;
		setInitialFilters: (filters: Filters) => void;
		pages: Readable<PagesStore>;
		pageKey: string;
		itemsPerPage: number;
		setKeepItems: () => void;
		updateUrl: boolean;
		hasMore: Readable<boolean>;
	}

	export interface PaginationApi<TItem> {
		items: Readable<TItem[]>;
		state: Readable<PaginationState>;
		hasActiveFilters: Readable<boolean>;
		firstNewResultIndex: Readable<number>;
		hasMore: Readable<boolean>;
	}

	const INTERNAL_CONTEXT_KEY = '__pagination-internal__';
	const PUBLIC_CONTEXT_KEY = '__pagination__';

	const { setContext: setInternalContext, getContext: _getInternalPaginationContext } =
		createTypedContext<PaginationInternalApi>(INTERNAL_CONTEXT_KEY);

	export const getInternalPaginationContext = _getInternalPaginationContext;

	const { setContext: setPublicContext, getContext: _getPaginationContext } =
		createTypedContext<PaginationApi<unknown>>(PUBLIC_CONTEXT_KEY);

	export const getPaginationContext = _getPaginationContext;
</script>

<script lang="ts">
	import { mounted } from '@288-toolkit/ui';

	import { replaceState } from '$app/navigation';
	import { writable, derived } from 'svelte/store';
	import machine from 'svelte-fsm';
	import { page } from '$app/stores';

	type Item = $$Generic;
	type Items = Item[];
	type ItemsData = { items: Items; itemsTotal: number };
	type GetItemsFunction = (offset: Offset, filters?: Filters) => ItemsData | Promise<ItemsData>;

	interface $$Slots {
		default: {
			items: Items;
			state: PaginationState;
			hasActiveFilters: boolean;
			firstNewResultIndex: number;
			hasMore: boolean;
		};
	}

	/**
	 * Function that receives the current offset (calculated from the
	 * requested page) and currently selected filters as parameter and returns the new items to display
	 * as well as the updated items count
	 */
	export let getItems: GetItemsFunction;
	/**
	 * The items to display on first page load
	 */
	export let initialItems: Items;
	/**
	 * The total items count
	 */
	export let itemsTotal: number;
	/**
	 * The number of items displayed on one page. DEFAULT: 12
	 */
	export let itemsPerPage = 12;
	/**
	 * The page property key used in the query string (i.e., `?page=3`). DEFAULT:
	 * "page"
	 */
	export let pageKey = 'page';
	/**
	 * Wether to update the url query string (using `replaceState`) with
	 * pagination and filter values. If PaginationLoadMore or PaginationInfiniteScroll is used,
	 * the url won't be updated and this prop will have no effect. DEFAULT: true
	 */
	export let updateUrl = true;

	let keepItems = false;

	const items = writable<Items>(initialItems);

	let initialPage = updateUrl ? Number($page.url.searchParams.get(pageKey)) || 1 : 1;

	const pages = writable<PagesStore>({
		current: initialPage,
		prev: initialPage - 1,
		next: initialPage + 1,
		total: Math.ceil(itemsTotal / itemsPerPage),
		itemsTotal,
		filters: {}
	});

	const firstNewResultIndex = writable<number>(-1);
	const hasMore = derived(
		pages,
		({ itemsTotal, next, total }) => itemsTotal > itemsPerPage && next <= total
	);

	const hasActiveFilters = derived(pages, (p) => {
		return Object.values(p.filters).flat().filter(Boolean).length > 0;
	});

	const setKeepItems = () => {
		keepItems = true;
		if (!updateUrl) {
			initialPage = 1;
		}
		pages.update((p) => {
			return {
				...p,
				current: initialPage,
				prev: initialPage - 1,
				next: initialPage + 1
			};
		});
	};

	const setInitialFilters = (filters: Filters) => {
		pages.update((p) => {
			return {
				...p,
				filters: {
					...(p.filters || {}),
					...filters
				}
			};
		});
	};

	const updateQueryString = (params: Record<string, string | string[] | null>) => {
		const query = new URLSearchParams(window.location.search);
		Object.entries(params).forEach(([key, value]) => {
			const isFirstPage = key === pageKey && value === '1';
			if (!value?.length || isFirstPage) {
				query.delete(key);
				return;
			}
			if (Array.isArray(value)) {
				query.delete(key);
				value.forEach((v) => {
					query.append(key, v);
				});
			} else {
				query.set(key, value);
			}
		});
		const qs = query.toString();
		const url = qs ? `?${qs}` : $page.url.pathname;
		replaceState(url, {});
	};

	const update = (params: UpdateArgs) => {
		state.update(params);
	};

	// Calling `onMount` outside of component initialization like we do in the `update` event of the `idle` state below
	// breaks in Svelte 5 so we need to store the value of `$mounted` in a reactive variable and use that instead
	$: isMounted = $mounted;

	const state = machine('idle', {
		idle: {
			update: () => {
				if (!isMounted) {
					return;
				}
				return 'loading';
			}
		},
		loading: {
			async _enter({ args }) {
				const { page, filters }: UpdateArgs = args[0];
				try {
					const currentPage = page || 1;
					const updatedFilters = { ...$pages.filters, ...filters };
					if (updateUrl) {
						updateQueryString({
							[pageKey]: `${currentPage}`,
							...updatedFilters
						});
					}
					const offset = Math.ceil((currentPage - 1) * itemsPerPage);
					const itemsData = await getItems(offset, updatedFilters);
					const pageChanged = currentPage !== $pages.current;
					if (keepItems && pageChanged) {
						$items = [...$items, ...itemsData.items];
						firstNewResultIndex.set($items.length - itemsData.items.length);
					} else {
						$items = itemsData.items;
					}
					pages.set({
						total: Math.ceil(itemsData.itemsTotal / itemsPerPage),
						itemsTotal: itemsData.itemsTotal,
						current: currentPage,
						prev: currentPage - 1,
						next: currentPage + 1,
						filters: updatedFilters
					});
					this.success();
				} catch (error) {
					this.error();
				}
			},
			success: 'idle',
			error: 'error'
		},
		error: {
			update: 'loading'
		}
	});

	setInternalContext({
		update,
		setInitialFilters,
		pages: readonly(pages),
		pageKey,
		itemsPerPage,
		setKeepItems,
		updateUrl,
		hasMore
	});

	setPublicContext({
		state,
		items: readonly(items),
		hasActiveFilters,
		firstNewResultIndex: readonly(firstNewResultIndex),
		hasMore
	});
</script>

<slot
	items={$items}
	state={$state}
	hasActiveFilters={$hasActiveFilters}
	firstNewResultIndex={$firstNewResultIndex}
	hasMore={$hasMore}
/>
