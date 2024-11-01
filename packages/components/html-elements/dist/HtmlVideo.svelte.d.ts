/// <reference types=".pnpm/svelte@4.2.17/node_modules/svelte" />
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        autoplay?: boolean | undefined;
        disableremoteplayback?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
        el?: HTMLVideoElement | undefined;
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
