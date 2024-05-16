export declare const slideshow: {
    readonly key: "slideshow";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./en.js")>;
        readonly fr: () => Promise<typeof import("./fr.js")>;
    };
};
