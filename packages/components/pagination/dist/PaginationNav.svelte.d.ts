import { SvelteComponent } from "svelte";
/**
 * Used to identify pagination links in the click event and to forward the page number
 */
export declare const PAGINATION_LINK_PAGE_ATTRIBUTE = "data-pagination-link-page";
declare const __propDef: {
    props: {
        /**
             * Nav element classes
             */ class?: string | undefined;
    };
    slots: {
        default: {};
    };
    events: {
        click: CustomEvent<{
            page: number;
        }>;
    };
};
export type PaginationNavProps = typeof __propDef.props;
export type PaginationNavEvents = typeof __propDef.events;
export type PaginationNavSlots = typeof __propDef.slots;
export default class PaginationNav extends SvelteComponent<PaginationNavProps, PaginationNavEvents, PaginationNavSlots> {
}
export {};
