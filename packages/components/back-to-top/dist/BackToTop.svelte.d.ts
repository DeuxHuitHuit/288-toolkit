import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BackToTopProps = typeof __propDef.props;
export type BackToTopEvents = typeof __propDef.events;
export type BackToTopSlots = typeof __propDef.slots;
export default class BackToTop extends SvelteComponent<BackToTopProps, BackToTopEvents, BackToTopSlots> {
}
export {};
