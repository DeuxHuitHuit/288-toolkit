import type { Maybe } from '@288-toolkit/types';
import { urlCanParse } from '@288-toolkit/url';

export type ThumbnailOptions = {
	width: string;
	height?: string;
};

const VIMEO_URL_REGEX = /^https:\/\/(www.)?vimeo.com/;

/**
 * Check if a URL is a valid Vimeo URL
 */
export const isVimeoUrl = (url: Maybe<string>): boolean => {
	if (!url) {
		return false;
	}
	return VIMEO_URL_REGEX.test(url);
};

/**
 * Get the Vimeo video ID from a URL
 * The supported Vimeo URL formats is as follows:
 * - https://vimeo.com/[VIDEO_ID]
 */
export const getVimeoId = (url: string) => {
	if (!urlCanParse(url)) {
		return '';
	}
	return new URL(url).pathname.replace('/', '');
};

/**
 * Get the URL of a Vimeo video thumbnail. Make sure to setup the `vimeo-thumbnail.jpg` route in your app (see README).
 */
export const getVimeoThumbnailUrl = (
	url: string,
	options: ThumbnailOptions = { width: '1280' }
) => {
	const params = new URLSearchParams({ url });
	Object.entries(options).forEach(([key, value]) => {
		if (value) {
			params.set(key, value);
		}
	});
	return `/vimeo-thumbnail.jpg?${params.toString()}`;
};
