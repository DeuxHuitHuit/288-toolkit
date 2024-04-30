import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The direction of the button.
             */ direction: 'previous' | 'next';
        /**
             * Classes to apply to the button.
             */ class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SlideshowButtonProps = typeof __propDef.props;
export type SlideshowButtonEvents = typeof __propDef.events;
export type SlideshowButtonSlots = typeof __propDef.slots;
export default class SlideshowButton extends SvelteComponent<SlideshowButtonProps, SlideshowButtonEvents, SlideshowButtonSlots> {
}
export {};
