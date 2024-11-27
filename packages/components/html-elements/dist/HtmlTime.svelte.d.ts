import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
         * The date to display
         */
        date: Date;
        /**
         * The date formatting options
         */
        formatOptions?: any;
        children?: import("svelte").Snippet<[{
            formattedDate: string;
        }]> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type HtmlTimeProps = typeof __propDef.props;
export type HtmlTimeEvents = typeof __propDef.events;
export type HtmlTimeSlots = typeof __propDef.slots;
export default class HtmlTime extends SvelteComponent<HtmlTimeProps, HtmlTimeEvents, HtmlTimeSlots> {
}
export {};
