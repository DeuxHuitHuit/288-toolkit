import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        url: Maybe<string>;
        title?: Maybe<string> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DailymotionEmbedProps = typeof __propDef.props;
export type DailymotionEmbedEvents = typeof __propDef.events;
export type DailymotionEmbedSlots = typeof __propDef.slots;
export default class DailymotionEmbed extends SvelteComponent<DailymotionEmbedProps, DailymotionEmbedEvents, DailymotionEmbedSlots> {
}
export {};
