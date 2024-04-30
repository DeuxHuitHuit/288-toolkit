import { tick } from 'svelte';
import type { Options } from './autofocus';

/**
 * This action will focus its node on mount and on update after `tick()` resolves.
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export const autofocusAfterTick = (node: HTMLElement, options: Options = { canFocus: true }) => {
	const focus = (options: Options) => {
		// undefined should act as the default, which is true
		if (options?.canFocus !== false) {
			tick().then(() => {
				node?.focus(options);
			});
		}
	};

	focus(options);

	return {
		update(options: Options) {
			focus(options);
		}
	};
};
