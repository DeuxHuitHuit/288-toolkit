import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The direction of the step
             */ direction: "next" | "prev";
        /**
             * Step link classes
             */ class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            disabled: boolean;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PaginationStepProps = typeof __propDef.props;
export type PaginationStepEvents = typeof __propDef.events;
export type PaginationStepSlots = typeof __propDef.slots;
export default class PaginationStep extends SvelteComponent<PaginationStepProps, PaginationStepEvents, PaginationStepSlots> {
}
export {};
