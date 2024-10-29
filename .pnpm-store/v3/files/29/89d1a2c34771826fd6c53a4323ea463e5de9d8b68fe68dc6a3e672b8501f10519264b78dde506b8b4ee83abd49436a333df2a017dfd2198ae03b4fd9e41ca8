import { createFocusTrap as _createFocusTrap } from 'focus-trap';
import { noop } from '../../helpers/callbacks.js';
export const useFocusTrap = ((node, config = {}) => {
    let unsub = noop;
    const update = (config) => {
        unsub();
        const trap = _createFocusTrap(node, {
            returnFocusOnDeactivate: false,
            allowOutsideClick: true,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
            ...config,
        });
        unsub = trap.deactivate;
        trap.activate();
    };
    update(config);
    return { destroy: unsub, update };
});
