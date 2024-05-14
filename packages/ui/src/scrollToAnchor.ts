import { replaceState } from '$app/navigation';
import { motionSafeScrollBehavior } from './motionSafeScrollBehavior.js';

/**
 * This action will smoothly scroll to the anchor link's target if it exists while
 * preserving the browser's default behavior.
 * @param node The anchor link
 */
export const scrollToAnchor = (node: HTMLAnchorElement) => {
	const onClick = (e: MouseEvent) => {
		if (!node.href) {
			return;
		}
		const hash = new URL(node.href).hash;
		if (!hash) {
			return;
		}
		const el = document.querySelector(decodeURIComponent(hash));
		if (!el) {
			return;
		}
		e.preventDefault();
		el.scrollIntoView({ behavior: motionSafeScrollBehavior(), block: 'start' });
		replaceState(hash, {});
	};
	node.addEventListener('click', onClick);
	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
};
