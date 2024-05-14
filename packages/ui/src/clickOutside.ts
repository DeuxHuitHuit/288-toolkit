import { clickUseCapture } from '@288-toolkit/device/window';

export const clickOutside = (node: HTMLElement, callback: (event: PointerEvent) => void) => {
	const handleClick = (event: PointerEvent) => {
		if (node.contains(event.target as HTMLElement)) {
			return;
		}
		callback(event);
	};

	const destroy = clickUseCapture.subscribe(handleClick);

	return {
		destroy
	};
};
