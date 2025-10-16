import type { Maybe } from '@288-toolkit/types';
/**
 * Check if a URL is a valid DailyMotion URL
 */
export declare const isDailyMotionUrl: (url: Maybe<string>) => boolean;
/**
 * Get the DailyMotion video ID from a URL
 * The supported DailyMotion URL formats is as follows:
 * - https://dailymotion.com/video/[VIDEO_ID]
 */
export declare const getDailyMotionId: (url: string) => string;
