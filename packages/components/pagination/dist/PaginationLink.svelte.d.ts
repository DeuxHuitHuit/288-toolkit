import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        page: number;
        label: string;
        disabled?: boolean | undefined;
        current?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PaginationLinkProps = typeof __propDef.props;
export type PaginationLinkEvents = typeof __propDef.events;
export type PaginationLinkSlots = typeof __propDef.slots;
export default class PaginationLink extends SvelteComponent<PaginationLinkProps, PaginationLinkEvents, PaginationLinkSlots> {
}
export {};
