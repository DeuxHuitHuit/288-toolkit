/// <reference types="svelte" />
import type { Maybe } from '@288-toolkit/types';
declare const Dismissable: import("svelte").Component<{
    /**
     * Used to identify the content being dismissed in browser storage.
     */
    key: string;
    /**
     * The delay in ms before the content shows up.
     */
    timeout?: number | undefined;
    /**
     * The date of the last update of the content.
     */
    lastUpdatedAt?: Maybe<Date> | undefined;
    /**
     * The maximum age of the dismissal in seconds.
     * The content will show up again after this time has past.
     */
    maxAge?: number | undefined;
    /**
     * Wether to use `sessionStorage` or `localStorage`.
     */
    browserStorage?: "session" | "local" | undefined;
    /**
     * Wether to close the content when navigating to another page.
     */
    closeOnNav?: boolean | undefined;
    children?: import("svelte").Snippet<[{
        close: () => void;
        dismiss: () => void;
        dismissed: boolean;
    }]> | undefined;
}, {
    /**
         * A function to close the popup without persistance.
         */ close: () => void;
    /**
         * A function to dismiss the popup for the provided maxAge.
         */ dismiss: () => void;
    /**
         * A function to check if the popup is dismissed.
         */ isDismissed: () => boolean;
}, "">;
type Dismissable = ReturnType<typeof Dismissable>;
export default Dismissable;
