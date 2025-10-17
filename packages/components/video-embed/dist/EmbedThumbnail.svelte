<script>import { getVimeoThumbnailUrl, isVimeoUrl } from './vimeo.js';
import { getYoutubeThumbnailUrl, isYoutubeUrl } from './youtube.js';
import { getDailyMotionThumbnailUrl, isDailyMotionUrl } from './dailymotion.js';
import { getVideoEmbedContext } from './EmbedGroup.svelte';
import { HtmlImg } from '@288-toolkit/html-elements';
/**
 * The url of the video. Already provided if this component is used inside an EmbedGroup.
 */
export let url = getVideoEmbedContext()?.url;
/**
 * The alt text for the image.
 */
export let alt = null;
let classes = '';
/**
 * The classes to apply to the img element.
 */
export { classes as class };
const getVendorThumbnailUrl = () => {
    if (!url) {
        return '';
    }
    if (isYoutubeUrl(url)) {
        return getYoutubeThumbnailUrl(url);
    }
    else if (isVimeoUrl(url)) {
        return getVimeoThumbnailUrl(url);
    }
    else if (isDailyMotionUrl(url)) {
        return getDailyMotionThumbnailUrl(url);
    }
    return '';
};
const posterSrc = getVendorThumbnailUrl();
</script>

<HtmlImg src={posterSrc} {alt} class={classes} />
