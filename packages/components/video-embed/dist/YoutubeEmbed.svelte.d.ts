import { SvelteComponent } from "svelte";
export type YoutubeEmbedOptions = {
    /** https://developers.google.com/youtube/player_parameters#Parameters */
    cc_lang_pref?: string;
    cc_load_policy?: boolean;
    color?: 'red' | 'white';
    controls?: boolean;
    disablekb?: boolean;
    enablejsapi?: boolean;
    end?: string;
    fs?: boolean;
    hl?: string;
    iv_load_policy?: boolean;
    list?: string;
    listType?: 'playlist' | 'user_uploads';
    modestbranding?: boolean;
    origin?: string;
    playlist?: string;
    playsinline?: boolean;
    rel?: boolean;
    widget_referrer?: string;
};
export declare const YOUTUBE_DEFAULTS: YoutubeEmbedOptions;
declare const __propDef: {
    props: {
        url: Maybe<string>;
        title?: any;
        muted?: boolean | undefined;
        autoplay?: boolean | undefined;
        loop?: boolean | undefined;
        start?: any;
        options?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type YoutubeEmbedProps = typeof __propDef.props;
export type YoutubeEmbedEvents = typeof __propDef.events;
export type YoutubeEmbedSlots = typeof __propDef.slots;
export default class YoutubeEmbed extends SvelteComponent<YoutubeEmbedProps, YoutubeEmbedEvents, YoutubeEmbedSlots> {
}
export {};
