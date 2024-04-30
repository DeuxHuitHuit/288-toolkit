import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The year the website was put online.
             */ publishYear: number;
        /**
             * The organization name to display in the copyright.
             */ orgName?: string | undefined;
        /**
             * The element to use for the copyright.
             */ as?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type CopyrightProps = typeof __propDef.props;
export type CopyrightEvents = typeof __propDef.events;
export type CopyrightSlots = typeof __propDef.slots;
export default class Copyright extends SvelteComponent<CopyrightProps, CopyrightEvents, CopyrightSlots> {
}
export {};
