import { SvelteComponent } from "svelte";
import { type Readable } from 'svelte/store';
import type { Maybe } from '@288-toolkit/types';
export interface VideoEmbedApi {
    /**
     * A readable store that indicates if the video is currently playing
     */
    playing: Readable<boolean>;
    /**
     * A readable store that indicates if preconnect has been requested
     */
    preconnect: Readable<boolean>;
    /**
     * Request preconnect
     */
    requestPreconnect: () => void;
    /**
     * Play the video
     */
    play: () => void;
    /**
     * The URL of the video
     */
    url: Maybe<string>;
}
export declare const getVideoEmbedContext: any;
declare const __propDef: {
    props: {
        url?: Maybe<string> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            playing: boolean;
            preconnect: boolean;
            play: () => void;
            requestPreconnect: () => void;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type EmbedGroupProps = typeof __propDef.props;
export type EmbedGroupEvents = typeof __propDef.events;
export type EmbedGroupSlots = typeof __propDef.slots;
export default class EmbedGroup extends SvelteComponent<EmbedGroupProps, EmbedGroupEvents, EmbedGroupSlots> {
}
export {};
