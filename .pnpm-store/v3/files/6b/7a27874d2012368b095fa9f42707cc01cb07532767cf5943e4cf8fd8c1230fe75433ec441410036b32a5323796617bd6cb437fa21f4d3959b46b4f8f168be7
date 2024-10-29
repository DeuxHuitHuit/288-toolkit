import { isElement, noop } from '../../helpers/index.js';
import { useInteractOutside } from '../index.js';
export const useModal = ((node, config) => {
    let unsubInteractOutside = noop;
    function update(config) {
        unsubInteractOutside();
        const { onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config;
        function closeModal() {
            onClose?.();
        }
        function onInteractOutsideStart(e) {
            const target = e.target;
            if (!isElement(target))
                return;
            e.stopImmediatePropagation();
        }
        function onInteractOutside(e) {
            if (!shouldCloseOnInteractOutside?.(e))
                return;
            e.stopImmediatePropagation();
            closeModal();
        }
        unsubInteractOutside = useInteractOutside(node, {
            onInteractOutsideStart,
            onInteractOutside: closeOnInteractOutside ? onInteractOutside : undefined,
            enabled: closeOnInteractOutside,
        }).destroy;
    }
    update(config);
    return {
        update,
        destroy() {
            unsubInteractOutside();
        },
    };
});
