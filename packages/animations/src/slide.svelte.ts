import { reducedMotion } from '@288-toolkit/device/media';
import { Tween, type TweenedOptions } from 'svelte/motion';
import { get } from 'svelte/store';

export interface SlideOptions {
	open: boolean;
	options?: TweenedOptions<number>;
	closedHeight?: number;
}

export const slide = (
	node: HTMLElement,
	{ open, options = {}, closedHeight = 0 }: SlideOptions
) => {
	const slideHeight = new Tween<number>(0, {
		...options,
		duration: get(reducedMotion) ? 0 : options.duration
	});

	$effect(() => {
		node.style.height = `${slideHeight.current}px`;
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
		}
	};
};
