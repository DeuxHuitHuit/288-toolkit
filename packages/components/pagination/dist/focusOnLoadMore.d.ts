/**
 * To be used inside `Pagination.svelte` along with `PaginationLoadMore.svelte`. Allows to focus
 * the first newly added element when loading more results.
 * @param group A string that identifies the group of results to track the last added index
 * @returns
 */
export declare const focusOnLoadMore: (node: HTMLElement, group: string) => void;
