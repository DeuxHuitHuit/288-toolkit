import { SvelteComponent } from "svelte";
type FilterFn = () => void;
type PaginationFiltersApi = {
    filter: FilterFn;
    activeFilters: Readable<ActiveFilters>;
};
export declare const getPaginationFiltersContext: () => PaginationFiltersApi;
import { type ActiveFilters } from './Pagination.svelte';
import { type Readable } from 'svelte/store';
declare const __propDef: {
    props: {
        /**
             * Optional form classes
             */ class?: string | undefined;
    };
    slots: {
        submit: Record<string, never>;
        default: {
            filter: FilterFn;
            activeFilters: ActiveFilters;
        };
    };
    events: {
        filter: CustomEvent<{
            event: Event;
        }>;
        reset: CustomEvent<{
            event: Event;
        }>;
    };
};
export type PaginationFiltersProps = typeof __propDef.props;
export type PaginationFiltersEvents = typeof __propDef.events;
export type PaginationFiltersSlots = typeof __propDef.slots;
export default class PaginationFilters extends SvelteComponent<PaginationFiltersProps, PaginationFiltersEvents, PaginationFiltersSlots> {
}
export {};
