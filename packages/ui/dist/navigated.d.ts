/**
 * A store that returns true when the user has navigated at least once
 * Since this store uses afterNavigate, it can only be used at component initialisation
 */
export declare const navigated: {
    subscribe(fn: (navigated: boolean) => void): () => void;
};
