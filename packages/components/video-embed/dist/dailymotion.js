import { urlCanParse } from '@288-toolkit/url';
const DAILYMOTION_URL_REGEX = /^https:\/\/(www.)?dailymotion.com\/video/;
/**
 * Check if a URL is a valid DailyMotion URL
 */
export const isDailyMotionUrl = (url) => {
    if (!url) {
        return false;
    }
    return DAILYMOTION_URL_REGEX.test(url);
};
/**
 * Get the DailyMotion video ID from a URL
 * The supported DailyMotion URL formats is as follows:
 * - https://dailymotion.com/video/[VIDEO_ID]
 */
export const getDailyMotionId = (url) => {
    if (!urlCanParse(url)) {
        return '';
    }
    return new URL(url).pathname.replace('/video/', '');
};
