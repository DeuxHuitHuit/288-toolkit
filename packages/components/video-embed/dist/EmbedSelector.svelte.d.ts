import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
import DailymotionEmbed from './DailymotionEmbed.svelte';
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
            provider: Maybe<"youtube" | "vimeo" | "dailymotion">;
            EmbedComponent: typeof DailymotionEmbed | null;
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
