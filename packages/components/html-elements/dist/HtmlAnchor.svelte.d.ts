import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        href: string;
        rel?: any;
        target?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            external: any;
        };
    };
};
export type HtmlAnchorProps = typeof __propDef.props;
export type HtmlAnchorEvents = typeof __propDef.events;
export type HtmlAnchorSlots = typeof __propDef.slots;
export default class HtmlAnchor extends SvelteComponent<HtmlAnchorProps, HtmlAnchorEvents, HtmlAnchorSlots> {
}
export {};
