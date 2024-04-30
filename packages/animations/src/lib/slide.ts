import { reducedMotion } from '@288-toolkit/device/media';
import { tweened } from 'svelte/motion';
import { get } from 'svelte/store';

export interface SlideOptions {
	open: boolean;
	options?: Parameters<typeof tweened<number>>[1];
	closedHeight?: number;
}

export const slide = (
	node: HTMLElement,
	{ open, options = {}, closedHeight = 0 }: SlideOptions
) => {
	const slideHeight = tweened<number>(0, {
		...options,
		duration: get(reducedMotion) ? 0 : options.duration
	});

	const slideUnsubscribe = slideHeight.subscribe((height) => {
		node.style.height = `${height}px`;
	});

	const calculateHeight = () => {
		const currentHeightStyle = node.style.height;
		node.style.height = 'auto';
		const nodeHeight = node.offsetHeight;
		node.style.height = currentHeightStyle;
		return nodeHeight;
	};

	const setHeight = (open: boolean, options: SlideOptions['options'] = {}, height = 0) => {
		node.style.overflow = 'hidden';
		slideHeight.set(open ? calculateHeight() : height, options).then(() => {
			if (open) {
				node.style.height = '';
				node.style.overflow = '';
			}
		});
	};

	setHeight(open, { duration: 0 }, closedHeight);

	return {
		update: ({ open, options = {}, closedHeight }: SlideOptions) => {
			setHeight(open, options, closedHeight);
		},
		destroy: slideUnsubscribe
	};
};
