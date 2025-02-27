import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The content that should be copied in the minimap
             */ content: HTMLElement;
        /**
             * Wether to allow dragging the thumb on the minimap
             */ draggable?: boolean | undefined;
        /**
             * Function called when the minimap is setup and updated. Useful to modify the content's DOM
             * before it is appended to the minimap.
             */ onSetup?: ((content: HTMLElement) => void) | undefined;
        /**
             * A function to update the minimap content. Useful if the original content's DOM is changed.
             */ update?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        track: {
            dragging: boolean;
        };
        thumb: {
            dragging: boolean;
        };
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MinimapProps = typeof __propDef.props;
export type MinimapEvents = typeof __propDef.events;
export type MinimapSlots = typeof __propDef.slots;
export default class Minimap extends SvelteComponent<MinimapProps, MinimapEvents, MinimapSlots> {
    get update(): () => void;
}
export {};
