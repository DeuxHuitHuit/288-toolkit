import type { Maybe } from '@288-toolkit/types';
export type ThumbnailOptions = {
    width: string;
    height?: string;
};
/**
 * Check if a URL is a valid Vimeo URL
 */
export declare const isVimeoUrl: (url: Maybe<string>) => boolean;
/**
 * Get the Vimeo video ID from a URL
 */
export declare const getVimeoId: (url: string) => string;
/**
 * Get the URL of a Vimeo video thumbnail. Make sure to setup the `vimeo-thumbnail.jpg` route in your app (see README).
 */
export declare const getVimeoThumbnailUrl: (url: string, options?: ThumbnailOptions) => string;
