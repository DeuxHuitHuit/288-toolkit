import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        /**
             * Used to identify the content being dismissed in browser storage.
             */ key: string;
        /**
             * The delay in ms before the content shows up.
             */ timeout?: number | undefined;
        /**
             * The date of the last update of the content.
             */ lastUpdatedAt?: Maybe<Date> | undefined;
        /**
             * The maximum age of the dismissal in seconds.
             * The content will show up again after this time has past.
             */ maxAge?: number | undefined;
        /**
             * Wether to use `sessionStorage` or `localStorage`.
             */ browserStorage?: "session" | "local" | undefined;
        /**
             * Wether to close the content when navigating to another page.
             */ closeOnNav?: boolean | undefined;
        /**
             * A function to close the popup without persistance.
             */ close?: (() => void) | undefined;
        /**
             * A function to dismiss the popup for the provided maxAge.
             */ dismiss?: (() => void) | undefined;
        /**
             * A function to check if the popup is dismissed.
             */ isDismissed?: (() => boolean) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            close: () => void;
            dismiss: () => void;
            dismissed: boolean;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DismissableProps = typeof __propDef.props;
export type DismissableEvents = typeof __propDef.events;
export type DismissableSlots = typeof __propDef.slots;
export default class Dismissable extends SvelteComponent<DismissableProps, DismissableEvents, DismissableSlots> {
    get close(): () => void;
    get dismiss(): () => void;
    get isDismissed(): () => boolean;
}
export {};
