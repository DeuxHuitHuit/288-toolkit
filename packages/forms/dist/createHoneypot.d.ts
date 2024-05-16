/// <reference types="svelte" />
/// <reference types=".pnpm/svelte@4.2.17/node_modules/svelte" />
/// <reference types="svelte" />
export declare const createHoneypot: () => {
    elements: {
        honeypot: import("@melt-ui/svelte/internal/helpers").MeltElement<import("svelte/store").Stores | undefined, import("svelte/action").Action<any, any, Record<never, any>>, () => {
            type: string;
            class: string;
            style: string;
            tabindex: string;
            autocomplete: string;
            name: string;
        }, "hp">;
    };
};
