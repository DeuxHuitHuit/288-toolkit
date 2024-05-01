import { autofocus, type Options } from './autofocus.js';

type OptionsWithDelay = Options & {
	delay?: number;
};

/**
 * This action will focus its node on mount or on update after a delay.
 * Please note that adding a delay will change the focus behavior on mobile:
 * we get the visual indicator that the element is focused, but the keyboard
 * will not open automatically.
 * @uses autofocus
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export const autofocusWithDelay = (
	node: HTMLElement,
	options: OptionsWithDelay = { canFocus: true, delay: 0 }
) => {
	let timeout: ReturnType<typeof setTimeout>;

	// Create the focus action
	const focus = autofocus(node, {
		// Disable focus on mount
		canFocus: false
	});

	// Delay update
	const delayFocus = (options: OptionsWithDelay) => {
		// Clear previous timeout
		clearTimeout(timeout);
		// Update after the delay
		timeout = setTimeout(() => focus.update(options), options?.delay);
	};

	// Start the delay
	delayFocus(options);

	return {
		update(options: OptionsWithDelay) {
			delayFocus(options);
		},
		destroy() {
			clearTimeout(timeout);
		}
	};
};
