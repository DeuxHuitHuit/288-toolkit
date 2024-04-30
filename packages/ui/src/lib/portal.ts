import type { Maybe } from '@288-toolkit/types';
import { tick } from 'svelte';

export type PortalTarget = HTMLElement | string;

/**
 * Renders an element in a different part of the DOM.
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 *
 * Based on https://github.com/romkor/svelte-portal/tree/master
 */
export const portal = (node: HTMLElement, target: PortalTarget = 'body') => {
	let targetEl: Maybe<HTMLElement> = null;

	async function update(newTarget: PortalTarget) {
		target = newTarget;
		if (typeof target === 'string') {
			targetEl = document.querySelector<HTMLElement>(target);
			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector<HTMLElement>(target);
			}
			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		} else {
			throw new TypeError(
				`Unknown portal target type: ${
					target === null ? 'null' : typeof target
				}. Allowed types: string (CSS selector) or HTMLElement.`
			);
		}
		targetEl.appendChild(node);
		node.hidden = false;
	}

	update(target);

	return {
		update,
		destroy: () => {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
};
