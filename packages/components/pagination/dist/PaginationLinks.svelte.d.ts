import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
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
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        link: {
            page: number;
            current: boolean;
        };
        ellipsis: Record<string, never>;
    };
};
export type PaginationLinksProps = typeof __propDef.props;
export type PaginationLinksEvents = typeof __propDef.events;
export type PaginationLinksSlots = typeof __propDef.slots;
export default class PaginationLinks extends SvelteComponent<PaginationLinksProps, PaginationLinksEvents, PaginationLinksSlots> {
}
export {};
