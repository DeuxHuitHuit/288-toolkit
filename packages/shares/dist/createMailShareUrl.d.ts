type MailtoParams = {
    email?: string;
    body?: string;
    subject?: string;
    cc?: string;
    bcc?: string;
};
/**
 * Creates a mailto URL with the given parameters.
 */
export declare const createMailShareUrl: (params: MailtoParams) => string;
export {};
