import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        [x: string]: any;
        href: string;
        rel?: Maybe<string> | undefined;
        target?: Maybe<string> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            external: any;
        };
    };
    exports?: undefined;
    bindings?: undefined;
};
export type HtmlAnchorProps = typeof __propDef.props;
export type HtmlAnchorEvents = typeof __propDef.events;
export type HtmlAnchorSlots = typeof __propDef.slots;
export default class HtmlAnchor extends SvelteComponent<HtmlAnchorProps, HtmlAnchorEvents, HtmlAnchorSlots> {
}
export {};
