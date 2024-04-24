import type { Maybe } from '@288-toolkit/types';

export type YtThumbnailFormat =
	| 'default'
	| 'mqdefault'
	| 'hqdefault'
	| 'sddefault'
	| 'maxresdefault';

const YOUTUBE_URL_REGEX = /^https:\/\/(www.)?(youtube.com|youtu.be)/;

/**
 * Check if a URL is a valid YouTube URL
 */
export const isYoutubeUrl = (url: Maybe<string>): boolean => {
	if (!url) {
		return false;
	}
	return YOUTUBE_URL_REGEX.test(url);
};

/**
 * Get the YouTube video ID from a URL
 */
export const getYoutubeId = (url: string) => {
	if (!url) {
		return '';
	}
	const urlObj = new URL(url);
	if (urlObj.host === 'youtu.be') {
		return urlObj.pathname.replace('/', '');
	}
	return urlObj.searchParams.get('v');
};

/**
 * Get the URL of a YouTube video thumbnail
 */
export const getYoutubeThumbnailUrl = (
	url: string,
	format: YtThumbnailFormat = 'maxresdefault'
) => {
	const id = getYoutubeId(url);
	return `https://i.ytimg.com/vi/${id}/${format}.jpg`;
};
