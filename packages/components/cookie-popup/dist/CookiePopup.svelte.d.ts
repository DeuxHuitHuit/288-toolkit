import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The consent event pushed to the dataLayer when the user accepts cookies
             */ gtmConsentEvent?: any;
        /**
             * The storage key used to persist the popup dismissal. Must be unique across projects.
             */ key: string;
        /**
             * How long the cookie popup should take to re-appear when dismissed.
             * Default: 30 days
             */ maxAge?: number | undefined;
        /**
             * How long the popup should take to show up on the page
             * Default: 0
             */ timeout?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            accept: () => void;
            deny: any;
        };
    };
};
export type CookiePopupProps = typeof __propDef.props;
export type CookiePopupEvents = typeof __propDef.events;
export type CookiePopupSlots = typeof __propDef.slots;
export default class CookiePopup extends SvelteComponent<CookiePopupProps, CookiePopupEvents, CookiePopupSlots> {
}
export {};
