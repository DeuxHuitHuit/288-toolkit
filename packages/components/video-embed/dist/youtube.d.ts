import type { Maybe } from '@288-toolkit/types';
export type YtThumbnailFormat = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';
/**
 * Check if a URL is a valid YouTube URL
 */
export declare const isYoutubeUrl: (url: Maybe<string>) => boolean;
/**
 * Get the YouTube video ID from a URL
 */
export declare const getYoutubeId: (url: string) => string | null;
/**
 * Get the URL of a YouTube video thumbnail
 */
export declare const getYoutubeThumbnailUrl: (url: string, format?: YtThumbnailFormat) => string;
