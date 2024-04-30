import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The url of the video. Already provided if this component is used inside an EmbedGroup.
             */ url?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            provider: Maybe<"youtube" | "vimeo">;
            EmbedComponent: any;
        };
    };
};
export type EmbedSelectorProps = typeof __propDef.props;
export type EmbedSelectorEvents = typeof __propDef.events;
export type EmbedSelectorSlots = typeof __propDef.slots;
export default class EmbedSelector extends SvelteComponent<EmbedSelectorProps, EmbedSelectorEvents, EmbedSelectorSlots> {
}
export {};
