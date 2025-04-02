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
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const PaginationStep: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    /**
         * The direction of the step
         */ direction: "next" | "prev";
    /**
         * Step link classes
         */ class?: string | undefined;
}, {
    default: {
        disabled: boolean;
    };
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        disabled: boolean;
    };
}, {}, string>;
type PaginationStep = InstanceType<typeof PaginationStep>;
export default PaginationStep;
