import { SvelteComponent } from "svelte";
export type VimeoEmbedOptions = {
    h?: string;
    title?: boolean | string;
    byline?: boolean | string;
    portrait?: boolean | string;
    autopause?: boolean | string;
    background?: boolean;
};
export declare const DEFAULTS: VimeoEmbedOptions;
declare const __propDef: {
    props: {
        url: Maybe<string>;
        title?: any;
        muted?: boolean | undefined;
        autoplay?: boolean | undefined;
        loop?: boolean | undefined;
        start?: any;
        options?: VimeoEmbedOptions | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type VimeoEmbedProps = typeof __propDef.props;
export type VimeoEmbedEvents = typeof __propDef.events;
export type VimeoEmbedSlots = typeof __propDef.slots;
export default class VimeoEmbed extends SvelteComponent<VimeoEmbedProps, VimeoEmbedEvents, VimeoEmbedSlots> {
}
export {};
