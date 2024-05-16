import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
declare const __propDef: {
    props: {
        /**
             * The url of the sprite.
             */ url: string;
        /**
             * The width in px of a single frame in the sprite.
             */ width: number;
        /**
             * The height in px of a single frame in the sprite.
             */ height: number;
        /**
             * The speed in ms of the animation.
             */ speed?: number | undefined;
        /**
             * The number of columns in the sprite.
             */ cols?: number | undefined;
        /**
             * The number of rows in the sprite.
             */ rows?: number | undefined;
        /**
             * Wether the animation should loop.
             */ loop?: boolean | undefined;
        /**
             * The still image to show when the animation is not running.
             */ still?: Maybe<string> | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SpriteAnimationProps = typeof __propDef.props;
export type SpriteAnimationEvents = typeof __propDef.events;
export type SpriteAnimationSlots = typeof __propDef.slots;
export default class SpriteAnimation extends SvelteComponent<SpriteAnimationProps, SpriteAnimationEvents, SpriteAnimationSlots> {
}
export {};
