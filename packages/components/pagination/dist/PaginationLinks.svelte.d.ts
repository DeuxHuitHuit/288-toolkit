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
declare const PaginationLinks: $$__sveltets_2_IsomorphicComponent<{
    /**
         * The number of page links surrounding the current page. DEFAULT: 2
         */ neighbours?: number | undefined;
    /**
         * Whether to show an ellipsis or not. DEFAULT: true
         */ ellipsis?: boolean | undefined;
    /**
         * Page links classes
         */ class?: string | undefined;
    /**
         * Ellipses classes
         */ classEllipsis?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    link: {
        page: number;
        current: boolean;
    };
    ellipsis: Record<string, never>;
}, {}, string>;
type PaginationLinks = InstanceType<typeof PaginationLinks>;
export default PaginationLinks;
