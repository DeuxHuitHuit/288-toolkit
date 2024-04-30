import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        src: Maybe<string>;
        srcset?: any;
        alt?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type HtmlImgProps = typeof __propDef.props;
export type HtmlImgEvents = typeof __propDef.events;
export type HtmlImgSlots = typeof __propDef.slots;
export default class HtmlImg extends SvelteComponent<HtmlImgProps, HtmlImgEvents, HtmlImgSlots> {
}
export {};
