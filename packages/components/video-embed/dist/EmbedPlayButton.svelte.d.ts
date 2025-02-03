import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The classes to apply to the button element.
             */ class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type EmbedPlayButtonProps = typeof __propDef.props;
export type EmbedPlayButtonEvents = typeof __propDef.events;
export type EmbedPlayButtonSlots = typeof __propDef.slots;
export default class EmbedPlayButton extends SvelteComponent<EmbedPlayButtonProps, EmbedPlayButtonEvents, EmbedPlayButtonSlots> {
}
export {};
