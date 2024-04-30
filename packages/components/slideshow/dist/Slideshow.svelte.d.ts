import { SvelteComponent } from "svelte";
export interface SlideshowContext {
    previous: () => void;
    next: () => void;
}
export declare const getSlideshowContext: () => SlideshowContext;
declare class __sveltets_Render<T> {
    props(): {
        /**
             * The items to loop over in the slideshow
             */ items: T[];
        /**
             * The duration of each individual slide, in milliseconds
             */ slideDuration?: number | undefined;
        /**
             * Whether the slideshow should run on its own. If this is
             * set to `false`, only clicking on a `SlideshowButton` will
             * allow to move from slide to slide.
             */ autoplay?: boolean | undefined;
        /**
             * Whether the slideshow should go back to the first slide
             * when doing `next` from the last slide; and, conversely,
             * whether the slideshow should go to the last slide when
             * doing `previous` from the first slide.
             */ loop?: boolean | undefined;
        /**
             * The delay in ms before the slideshow starts
             */ startDelay?: number | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            item: T;
            index: number;
        };
    };
}
export type SlideshowProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type SlideshowEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type SlideshowSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Slideshow<T> extends SvelteComponent<SlideshowProps<T>, SlideshowEvents<T>, SlideshowSlots<T>> {
}
export {};
