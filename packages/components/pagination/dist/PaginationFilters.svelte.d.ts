/// <reference types="svelte" />
/// <reference types=".pnpm/svelte@5.17.2/node_modules/svelte" />
type FilterFn = () => void;
type PaginationFiltersApi = {
    filter: FilterFn;
    activeFilters: Readable<ActiveFilters>;
};
export declare const getPaginationFiltersContext: () => PaginationFiltersApi;
import { type ActiveFilters } from './Pagination.svelte';
import { type Readable } from 'svelte/store';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const PaginationFilters: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    /**
         * Optional form classes
         */ class?: string | undefined;
}, {
    submit: Record<string, never>;
    default: {
        filter: FilterFn;
        activeFilters: ActiveFilters;
    };
}>, {
    filter: CustomEvent<{
        event: Event;
    }>;
    reset: CustomEvent<{
        event: Event;
    }>;
}, {
    submit: Record<string, never>;
    default: {
        filter: FilterFn;
        activeFilters: ActiveFilters;
    };
}, {}, string>;
type PaginationFilters = InstanceType<typeof PaginationFilters>;
export default PaginationFilters;
