import { clickUseCapture } from '@288-toolkit/device/window';
export const clickOutside = (node, callback) => {
    const handleClick = (event) => {
        if (node.contains(event.target)) {
            return;
        }
        callback(event);
    };
    const destroy = clickUseCapture.subscribe(handleClick);
    return {
        destroy
    };
};
