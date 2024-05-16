export declare const duration: {
    readonly key: "duration";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./duration/en.js")>;
        readonly fr: () => Promise<typeof import("./duration/fr.js")>;
    };
};
export declare const filesize: {
    readonly key: "filesize";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./filesize/en.js")>;
        readonly fr: () => Promise<typeof import("./filesize/fr.js")>;
    };
};
export declare const relativeTime: {
    readonly key: "relativeTime";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./relativeTime/en.js")>;
        readonly fr: () => Promise<typeof import("./relativeTime/fr.js")>;
    };
};
