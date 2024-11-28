import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
         * The direction of the marquee.
         */
        direction?: "natural" | "inverted" | undefined;
        /**
         * The orientation of the marquee. Default: `horizontal`.
         */
        orientation?: "vertical" | "horizontal" | undefined;
        /**
         * Wether the marquee should pause when hovered. Default: `false`.
         */
        stopOnHover?: boolean | undefined;
        children?: import("svelte").Snippet<[any]> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MarqueeProps = typeof __propDef.props;
export type MarqueeEvents = typeof __propDef.events;
export type MarqueeSlots = typeof __propDef.slots;
export default class Marquee extends SvelteComponent<MarqueeProps, MarqueeEvents, MarqueeSlots> {
}
export {};
