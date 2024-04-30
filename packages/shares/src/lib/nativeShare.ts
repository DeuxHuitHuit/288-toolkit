import type { MaybeUndefined } from '@288-toolkit/types';
import type { ActionReturn } from 'svelte/action';

type Attributes = {
	'on:nativesharesunsupported'?: (e: CustomEvent<{ node: HTMLButtonElement }>) => void;
};

/**
 * Svelte action that adds a click event listener to the node that calls the native share API.
 */
export const nativeShare = (
	node: HTMLButtonElement
): MaybeUndefined<ActionReturn<never, Attributes>> => {
	if (typeof window?.navigator?.share !== 'function') {
		node.dispatchEvent(new CustomEvent('nativesharesunsupported', { detail: { node } }));
		return;
	}

	const onShare = () => {
		try {
			window.navigator.share({
				url: window.location.href,
				title: document.title
			});
		} catch (error) {
			console.error(error);
		}
	};

	node.addEventListener('click', onShare);

	return {
		destroy() {
			node.removeEventListener('click', onShare);
		}
	};
};
