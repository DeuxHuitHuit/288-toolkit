import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        /**
             * The url of the video. Already provided if this component is used inside an EmbedGroup.
             */ url?: Maybe<string> | undefined;
        /**
             * The alt text for the image.
             */ alt?: Maybe<string> | undefined;
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
