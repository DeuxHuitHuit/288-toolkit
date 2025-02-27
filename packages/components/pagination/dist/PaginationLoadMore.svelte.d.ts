import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * Optional link classes
             */ class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            label: any;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PaginationLoadMoreProps = typeof __propDef.props;
export type PaginationLoadMoreEvents = typeof __propDef.events;
export type PaginationLoadMoreSlots = typeof __propDef.slots;
export default class PaginationLoadMore extends SvelteComponent<PaginationLoadMoreProps, PaginationLoadMoreEvents, PaginationLoadMoreSlots> {
}
export {};
