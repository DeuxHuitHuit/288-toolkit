import { SvelteComponent } from "svelte";
import YtEmbed from './YoutubeEmbed.svelte';
import VimeoEmbed from './VimeoEmbed.svelte';
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        /**
             * The url of the video. Already provided if this component is used inside an EmbedGroup.
             */ url?: Maybe<string> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            provider: Maybe<"youtube" | "vimeo">;
            EmbedComponent: typeof YtEmbed | typeof VimeoEmbed | null;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type EmbedSelectorProps = typeof __propDef.props;
export type EmbedSelectorEvents = typeof __propDef.events;
export type EmbedSelectorSlots = typeof __propDef.slots;
export default class EmbedSelector extends SvelteComponent<EmbedSelectorProps, EmbedSelectorEvents, EmbedSelectorSlots> {
}
export {};
