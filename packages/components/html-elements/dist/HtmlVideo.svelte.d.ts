import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [key: string]: any;
        autoplay?: boolean | undefined;
        disableremoteplayback?: boolean | undefined;
        children?: import("svelte").Snippet<[]> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type HtmlVideoProps = typeof __propDef.props;
export type HtmlVideoEvents = typeof __propDef.events;
export type HtmlVideoSlots = typeof __propDef.slots;
export default class HtmlVideo extends SvelteComponent<HtmlVideoProps, HtmlVideoEvents, HtmlVideoSlots> {
}
export {};
