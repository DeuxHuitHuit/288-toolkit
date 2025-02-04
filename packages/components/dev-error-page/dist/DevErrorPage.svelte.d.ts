import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DevErrorPageProps = typeof __propDef.props;
export type DevErrorPageEvents = typeof __propDef.events;
export type DevErrorPageSlots = typeof __propDef.slots;
export default class DevErrorPage extends SvelteComponent<DevErrorPageProps, DevErrorPageEvents, DevErrorPageSlots> {
}
export {};
