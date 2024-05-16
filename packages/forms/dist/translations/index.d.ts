export declare const newsletterForm: {
    readonly key: "newsletter-form";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./newsletter-form/en.js")>;
        readonly fr: () => Promise<typeof import("./newsletter-form/fr.js")>;
    };
};
