/// <reference types="svelte" />
/// <reference types=".pnpm/svelte@5.17.2/node_modules/svelte" />
/**
 * Used to identify pagination links in the click event and to forward the page number
 */
export declare const PAGINATION_LINK_PAGE_ATTRIBUTE = "data-pagination-link-page";
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
declare const PaginationNav: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    /**
         * Nav element classes
         */ class?: string | undefined;
}, {
    default: {};
}>, {
    click: CustomEvent<{
        page: number;
    }>;
}, {
    default: {};
}, {}, string>;
type PaginationNav = InstanceType<typeof PaginationNav>;
export default PaginationNav;
