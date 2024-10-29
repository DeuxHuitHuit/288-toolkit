import { executeCallbacks, noop } from '../../helpers/callbacks.js';
import { addEventListener } from '../../helpers/event.js';
import { isHTMLElement, isReadable } from '../../helpers/is.js';
import { readable } from 'svelte/store';
import { withGet } from '../../helpers/withGet.js';
import { getOwnerDocument, isOrContainsTarget } from '../../helpers/elements.js';
const layers = new Set();
export const usePreventTextSelectionOverflow = ((node, config = {}) => {
    layers.add(node);
    let unsubEvents = noop;
    let unsubSelectionLock = noop;
    const documentObj = getOwnerDocument(node);
    let isPointerDownInside = false;
    const update = (config) => {
        unsubEvents();
        resetSelectionLock();
        const options = { enabled: true, ...config };
        const enabled = isReadable(options.enabled)
            ? options.enabled
            : withGet(readable(options.enabled));
        const onPointerDown = (e) => {
            const target = e.target;
            if (!isHighestLayer(node) || !isHTMLElement(target) || !enabled.get())
                return;
            isPointerDownInside = isOrContainsTarget(node, target);
            if (isPointerDownInside) {
                unsubSelectionLock = preventTextSelectionOverflow(node);
            }
        };
        unsubEvents = executeCallbacks(addEventListener(documentObj, 'pointerdown', onPointerDown, true), addEventListener(documentObj, 'pointerup', resetSelectionLock, true));
    };
    const resetSelectionLock = () => {
        unsubSelectionLock();
        unsubSelectionLock = noop;
        isPointerDownInside = false;
    };
    update(config);
    return {
        destroy() {
            layers.delete(node);
            unsubEvents();
            resetSelectionLock();
        },
        update,
    };
});
const preventTextSelectionOverflow = (node) => {
    const body = document.body;
    const originalBodyUserSelect = getUserSelect(body);
    const originalNodeUserSelect = getUserSelect(node);
    setUserSelect(body, 'none');
    setUserSelect(node, 'text');
    return () => {
        setUserSelect(body, originalBodyUserSelect);
        setUserSelect(node, originalNodeUserSelect);
    };
};
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
const setUserSelect = (node, value) => {
    node.style.userSelect = value;
    node.style.webkitUserSelect = value;
};
const isHighestLayer = (node) => [...layers].at(-1) === node;
