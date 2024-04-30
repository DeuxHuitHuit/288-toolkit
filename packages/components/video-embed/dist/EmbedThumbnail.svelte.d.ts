import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The url of the video. Already provided if this component is used inside an EmbedGroup.
             */ url?: any;
        /**
             * The alt text for the image.
             */ alt?: any;
        /**
             * The classes to apply to the img element.
             */ class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EmbedThumbnailProps = typeof __propDef.props;
export type EmbedThumbnailEvents = typeof __propDef.events;
export type EmbedThumbnailSlots = typeof __propDef.slots;
export default class EmbedThumbnail extends SvelteComponent<EmbedThumbnailProps, EmbedThumbnailEvents, EmbedThumbnailSlots> {
}
export {};
