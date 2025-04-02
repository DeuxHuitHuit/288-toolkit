/// <reference types="svelte" />
/// <reference types=".pnpm/svelte@5.17.2/node_modules/svelte" />
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
declare const PaginationInfiniteScroll: $$__sveltets_2_IsomorphicComponent<{
    /**
         * The intersection observer threshold, at which the component starts loading
         * the next items. Default: 0.5.
         */ threshold?: IntersectionObserverInit['threshold'];
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type PaginationInfiniteScroll = InstanceType<typeof PaginationInfiniteScroll>;
export default PaginationInfiniteScroll;
