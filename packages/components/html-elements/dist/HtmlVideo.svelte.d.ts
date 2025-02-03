import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        autoplay?: boolean | undefined;
        disableremoteplayback?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type HtmlVideoProps = typeof __propDef.props;
export type HtmlVideoEvents = typeof __propDef.events;
export type HtmlVideoSlots = typeof __propDef.slots;
export default class HtmlVideo extends SvelteComponent<HtmlVideoProps, HtmlVideoEvents, HtmlVideoSlots> {
}
export {};
