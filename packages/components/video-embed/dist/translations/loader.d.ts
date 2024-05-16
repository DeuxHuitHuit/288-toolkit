export declare const videoEmbed: {
    readonly key: "video-embed";
    readonly loaders: {
        readonly en: () => Promise<typeof import("./en.js")>;
        readonly fr: () => Promise<typeof import("./fr.js")>;
    };
};
