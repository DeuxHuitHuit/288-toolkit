import { get } from 'svelte/store';
import { getPaginationContext } from './Pagination.svelte';
const groupIndices = {};
/**
 * To be used inside `Pagination.svelte` along with `PaginationLoadMore.svelte`. Allows to focus
 * the first newly added element when loading more results.
 * @param group A string that identifies the group of results to track the last added index
 * @returns
 */
export const focusOnLoadMore = (node, group) => {
    const { firstNewResultIndex } = getPaginationContext() ?? {};
    if (!firstNewResultIndex) {
        return;
    }
    const groupIndex = groupIndices[group];
    if (groupIndex === undefined) {
        groupIndices[group] = 0;
    }
    const index = groupIndices[group] + 1;
    groupIndices[group] = index;
    if (index !== get(firstNewResultIndex)) {
        return;
    }
    node.focus();
};
