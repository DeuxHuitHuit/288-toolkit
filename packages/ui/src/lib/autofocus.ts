export type Options = FocusOptions & {
	canFocus?: boolean;
};

/**
 * This action will focus its node on mount and on update.
 * @param node The HTMLElement to focus
 * @param options The options of the actions
 */
export const autofocus = (node: HTMLElement, options: Options = { canFocus: true }) => {
	const focus = (options: Options) => {
		// undefined should act as the default, which is true
		if (options?.canFocus !== false) {
			node?.focus(options);
		}
	};

	focus(options);

	return {
		update(options: Options) {
			focus(options);
		}
	};
};
