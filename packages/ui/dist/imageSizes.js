/**
 * Converts an array of `ImageSizes` into a string that can be used as the
 * `sizes` attribute of an `<img>` element.
 */
export const imageSizes = (sizes) => {
    return sizes
        .sort((a, b) => {
        // TODO: Make the diff between min-width and max-width
        const useWidth = () => parseInt(b.width, 10) - parseInt(a.width, 10);
        if (a.mq === b.mq) {
            return useWidth();
        }
        else if (!a.mq) {
            return 1;
        }
        else if (!b.mq) {
            return -1;
        }
        return useWidth();
    })
        .map((size) => {
        return `${size.mq || ''} ${size.width}`.trim();
    })
        .join(', ')
        .trim();
};
