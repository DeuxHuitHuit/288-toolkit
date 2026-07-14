import { SvelteComponent } from "svelte";
import { type Readable } from 'svelte/store';
import type { Maybe } from '@288-toolkit/types';
export type InitialConsentState = 'not-required' | 'required';
export type ConsentState = InitialConsentState | 'accepted' | 'rejected' | 'pending';
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
     * Stop the video
     */
    stop: () => void;
    /**
     * The URL of the video
     */
    url: Maybe<string>;
    /**
     * The consent state of the user
     */
    consentState: Readable<ConsentState>;
    /**
     * Accept the consent and plays the video
     */
    acceptConsent: () => void;
    /**
     * Reject the consent and stops the video
     */
    rejectConsent: () => void;
}
export declare const getVideoEmbedContext: () => VideoEmbedApi;
declare const __propDef: {
    props: {
        url?: Maybe<string> | undefined;
        initialConsentState?: InitialConsentState | undefined;
        playing?: Readable<boolean> | undefined;
        consentState?: Readable<ConsentState> | undefined;
        play?: (() => void) | undefined;
        stop?: (() => void) | undefined;
        acceptConsent?: (() => void) | undefined;
        rejectConsent?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            playing: boolean;
            preconnect: boolean;
            play: () => void;
            stop: () => void;
            requestPreconnect: () => void;
            consentState: ConsentState;
            acceptConsent: () => void;
            rejectConsent: () => void;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type EmbedGroupProps = typeof __propDef.props;
export type EmbedGroupEvents = typeof __propDef.events;
export type EmbedGroupSlots = typeof __propDef.slots;
export default class EmbedGroup extends SvelteComponent<EmbedGroupProps, EmbedGroupEvents, EmbedGroupSlots> {
    get playing(): Readable<boolean>;
    get consentState(): Readable<ConsentState>;
    get play(): () => void;
    get stop(): () => void;
    get acceptConsent(): () => void;
    get rejectConsent(): () => void;
}
export {};
