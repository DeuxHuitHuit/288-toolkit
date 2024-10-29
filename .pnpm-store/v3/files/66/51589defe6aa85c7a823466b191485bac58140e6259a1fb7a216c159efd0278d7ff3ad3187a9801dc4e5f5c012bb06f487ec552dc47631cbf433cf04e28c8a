import type { Stores, StoresValues } from 'svelte/store';
type EffectOptions = {
    /**
     * Whether to skip the first run
     * @default undefined
     */
    skipFirstRun?: boolean;
};
/**
 * A utility function that creates an effect from a set of stores and a function.
 * The effect is automatically cleaned up when the component is destroyed.
 *
 * @template S - The type of the stores object
 * @param stores - The stores object to derive from
 * @param fn - The function to run when the stores change
 * @param opts {@link EffectOptions}
 * @returns A function that can be used to unsubscribe the effect
 */
export declare function effect<S extends Stores>(stores: S, fn: (values: StoresValues<S>) => (() => void) | void, opts?: EffectOptions): () => void;
export {};
