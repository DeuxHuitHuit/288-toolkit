/**
 * Svelte action that adds a click event listener to the node that calls the native share API.
 */
export const nativeShare = (node) => {
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
        }
        catch (error) {
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
