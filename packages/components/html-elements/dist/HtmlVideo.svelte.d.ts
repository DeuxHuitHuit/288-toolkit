import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        autoplay?: boolean | undefined;
        disableremoteplayback?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type HtmlVideoProps = typeof __propDef.props;
export type HtmlVideoEvents = typeof __propDef.events;
export type HtmlVideoSlots = typeof __propDef.slots;
export default class HtmlVideo extends SvelteComponent<HtmlVideoProps, HtmlVideoEvents, HtmlVideoSlots> {
}
export {};
