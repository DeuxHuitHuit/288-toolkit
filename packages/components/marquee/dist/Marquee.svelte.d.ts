import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The direction of the marquee.
             */ direction?: "natural" | "inverted" | undefined;
        /**
             * The orientation of the marquee. Default: `horizontal`.
             */ orientation?: "vertical" | "horizontal" | undefined;
        /**
             * Wether the marquee should pause when hovered. Default: `false`.
             */ stopOnHover?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            copy: any;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MarqueeProps = typeof __propDef.props;
export type MarqueeEvents = typeof __propDef.events;
export type MarqueeSlots = typeof __propDef.slots;
export default class Marquee extends SvelteComponent<MarqueeProps, MarqueeEvents, MarqueeSlots> {
}
export {};
