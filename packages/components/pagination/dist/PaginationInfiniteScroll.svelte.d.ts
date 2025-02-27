import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The intersection observer threshold, at which the component starts loading
             * the next items. Default: 0.5.
             */ threshold?: IntersectionObserverInit['threshold'];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PaginationInfiniteScrollProps = typeof __propDef.props;
export type PaginationInfiniteScrollEvents = typeof __propDef.events;
export type PaginationInfiniteScrollSlots = typeof __propDef.slots;
export default class PaginationInfiniteScroll extends SvelteComponent<PaginationInfiniteScrollProps, PaginationInfiniteScrollEvents, PaginationInfiniteScrollSlots> {
}
export {};
