import { motionSafeScrollBehavior } from './motionSafeScrollBehavior.js';

type Options = ScrollIntoViewOptions & {
	canScroll?: boolean;
};

/**
 * This action will scroll the element into view on mount.
 * @param node The HTMLElement to scroll into view
 * @param options The options to pass to the scrollIntoView method
 */
export const scrollIntoView = (node: HTMLElement, options: Options = { canScroll: true }) => {
	const update = (newOptions: Options) => {
		// undefined should act as the default, which is true
		if (options?.canScroll === false) {
			return;
		}

		// Set defaults
		options = {
			block: 'center',
			inline: 'nearest',
			...newOptions,
			// Make sure we override the behavior if reduced motion is enabled
			behavior: motionSafeScrollBehavior(options?.behavior)
		};

		node.scrollIntoView(options);
	};

	update(options);

	return {
		update
	};
};
