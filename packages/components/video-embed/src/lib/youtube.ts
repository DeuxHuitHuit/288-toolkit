import type { Maybe } from '@288-toolkit/types';
import { urlCanParse } from '@288-toolkit/url';

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
 * Get the YouTube video ID from a URL.
 * YouTube urls can have different formats:
 * - https://www.youtube.com/watch?v=[VIDEO_ID]
 * - https://www.youtube.com/embed/[VIDEO_ID]
 * - https://www.youtube.com/v/[VIDEO_ID]
 * - https://www.youtube.com/watch/[VIDEO_ID]
 * - https://www.youtube.com/shorts/[VIDEO_ID]
 * - https://youtu.be/[VIDEO_ID]
 *
 * @param url The YouTube URL
 */
export const getYoutubeId = (url: string) => {
	if (!url) {
		return '';
	}
	if (!urlCanParse(url)) {
		return '';
	}

	const urlObj = new URL(url);

	// Check search params first
	if (urlObj.searchParams.has('v')) {
		const v = urlObj.searchParams.get('v')?.trim();
		if (v) {
			return v;
		}
	}

	const pathParts = urlObj.pathname.split('/').filter(Boolean);

	// https://www.youtube.com/embed/[VIDEO_ID]
	if (pathParts.length > 1 && pathParts[0] === 'embed') {
		return pathParts[1];

		// https://www.youtube.com/v/[VIDEO_ID]
	} else if (pathParts.length > 1 && pathParts[0] === 'v') {
		return pathParts[1];

		// https://www.youtube.com/shorts/[VIDEO_ID]
	} else if (pathParts.length > 1 && pathParts[0] === 'shorts') {
		return pathParts[1];

		// https://www.youtube.com/watch/[VIDEO_ID]
	} else if (pathParts.length > 1 && pathParts[0] === 'watch') {
		return pathParts[1];

		// https://youtu.be/[VIDEO_ID]
	} else if (pathParts.length === 1) {
		return pathParts[0];
	}

	// Not found...
	return '';
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
