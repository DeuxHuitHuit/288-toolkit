import type { Maybe } from '@288-toolkit/types';
export type YtThumbnailFormat = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';
/**
 * Check if a URL is a valid YouTube URL
 */
export declare const isYoutubeUrl: (url: Maybe<string>) => boolean;
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
export declare const getYoutubeId: (url: string) => string;
/**
 * Get the URL of a YouTube video thumbnail
 */
export declare const getYoutubeThumbnailUrl: (url: string, format?: YtThumbnailFormat) => string;
