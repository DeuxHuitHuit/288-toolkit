import { afterNavigate } from '$app/navigation';

class Navigated {
	current = $state(false);

	constructor() {
		afterNavigate(({ from }) => (this.current = !!from));
	}
}

/**
 * A reactive object with a `current` property that is true when the user has navigated at least once
 * Since this store uses afterNavigate, it can only be used at component initialisation
 */
export const navigated = new Navigated();
