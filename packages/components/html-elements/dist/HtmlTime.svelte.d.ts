import { SvelteComponent } from "svelte";
import { type FormatDateOptions } from '@288-toolkit/format';
declare const __propDef: {
    props: {
        /**
             * The date to display
             */ date: Date;
        /**
             * The date formatting options
             */ formatOptions?: FormatDateOptions | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            formattedDate: string;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type HtmlTimeProps = typeof __propDef.props;
export type HtmlTimeEvents = typeof __propDef.events;
export type HtmlTimeSlots = typeof __propDef.slots;
export default class HtmlTime extends SvelteComponent<HtmlTimeProps, HtmlTimeEvents, HtmlTimeSlots> {
}
export {};
