export type ImageSizeUnits = 'vw' | 'rem' | 'px';
export type ImageSizeMediaQueryUnits = 'px' | 'rem';
export type ImageSizeSupportedMediaQuery = 'min-width' | 'max-width';
export type ImageSize = {
    /**
     * The displayed width of the image
     */
    width: `${number}${ImageSizeUnits}`;
    /**
     * An optional media query dictating when the image will be displayed
     * at this width.
     */
    mq?: `(${ImageSizeSupportedMediaQuery}: ${number}${ImageSizeMediaQueryUnits})`;
};
export type ImageSizes = ImageSize[];
/**
 * Converts an array of `ImageSizes` into a string that can be used as the
 * `sizes` attribute of an `<img>` element.
 */
export declare const imageSizes: (sizes: ImageSizes) => string;
