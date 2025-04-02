/// <reference types="svelte" />
/// <reference types=".pnpm/svelte@5.17.2/node_modules/svelte" />
import { type Readable } from 'svelte/store';
export type PaginationState = 'idle' | 'loading' | 'error';
export type Filters = Record<string, string[]>;
export type ActiveFilter = {
    key: string;
    value: string;
    clear: () => void;
};
export type ActiveFilters = ActiveFilter[];
export type Offset = number;
export type UpdateArgs = {
    page?: number;
    filters?: Filters;
};
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
export declare const getInternalPaginationContext: any;
export declare const getPaginationContext: any;
declare class __sveltets_Render<Item> {
    props(): {
        /**
             * Function that receives the current offset (calculated from the
             * requested page) and currently selected filters as parameter and returns the new items to display
             * as well as the updated items count
             */ getItems: (offset: number, filters?: Filters | undefined) => {
            items: Item[];
            itemsTotal: number;
        } | Promise<{
            items: Item[];
            itemsTotal: number;
        }>;
        /**
             * The items to display on first page load
             */ initialItems: Item[];
        /**
             * The total items count
             */ itemsTotal: number;
        /**
             * The number of items displayed on one page. DEFAULT: 12
             */ itemsPerPage?: number | undefined;
        /**
             * The page property key used in the query string (i.e., `?page=3`). DEFAULT:
             * "page"
             */ pageKey?: string | undefined;
        /**
             * Wether to update the url query string (using `replaceState`) with
             * pagination and filter values. If PaginationLoadMore or PaginationInfiniteScroll is used,
             * the url won't be updated and this prop will have no effect. DEFAULT: true
             */ updateUrl?: boolean | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            items: Item[];
            state: PaginationState;
            hasActiveFilters: boolean;
            firstNewResultIndex: number;
            hasMore: boolean;
        };
    };
    bindings(): string;
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Item>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Item>['props']> & {
        children?: any;
    }>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Item>['props']>, ReturnType<__sveltets_Render<Item>['events']>, ReturnType<__sveltets_Render<Item>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Item>['bindings']>;
    } & ReturnType<__sveltets_Render<Item>['exports']>;
    <Item>(internal: unknown, props: ReturnType<__sveltets_Render<Item>['props']> & {
        $$events?: ReturnType<__sveltets_Render<Item>['events']>;
        $$slots?: ReturnType<__sveltets_Render<Item>['slots']>;
        children?: any;
    }): ReturnType<__sveltets_Render<Item>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Pagination: $$IsomorphicComponent;
type Pagination<Item> = InstanceType<typeof Pagination<Item>>;
export default Pagination;
