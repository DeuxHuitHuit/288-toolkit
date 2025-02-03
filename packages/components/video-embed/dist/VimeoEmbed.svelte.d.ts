import { SvelteComponent } from "svelte";
export type VimeoEmbedOptions = {
    h?: string;
    title?: boolean | string;
    byline?: boolean | string;
    portrait?: boolean | string;
    autopause?: boolean | string;
    background?: boolean;
};
export declare const VIMEO_DEFAULTS: VimeoEmbedOptions;
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        url: Maybe<string>;
        title?: Maybe<string> | undefined;
        muted?: boolean | undefined;
        autoplay?: boolean | undefined;
        loop?: boolean | undefined;
        start?: Maybe<number> | undefined;
        options?: VimeoEmbedOptions | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type VimeoEmbedProps = typeof __propDef.props;
export type VimeoEmbedEvents = typeof __propDef.events;
export type VimeoEmbedSlots = typeof __propDef.slots;
export default class VimeoEmbed extends SvelteComponent<VimeoEmbedProps, VimeoEmbedEvents, VimeoEmbedSlots> {
}
export {};
