import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        [key: string]: any;
        src: Maybe<string>;
        srcset?: Maybe<string> | undefined;
        alt?: Maybe<string> | undefined;
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
