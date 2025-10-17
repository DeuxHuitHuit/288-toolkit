<script>import { isYoutubeUrl } from './youtube.js';
import { isVimeoUrl } from './vimeo.js';
import { getVideoEmbedContext } from './EmbedGroup.svelte';
import YtEmbed from './YoutubeEmbed.svelte';
import VimeoEmbed from './VimeoEmbed.svelte';
import DailymotionEmbed from './DailymotionEmbed.svelte';
import { isDailyMotionUrl } from './dailymotion.js';
/**
 * The url of the video. Already provided if this component is used inside an EmbedGroup.
 */
export let url = getVideoEmbedContext()?.url;
const providers = {
    youtube: YtEmbed,
    vimeo: VimeoEmbed,
    dailymotion: DailymotionEmbed
};
const getProvider = () => {
    if (isYoutubeUrl(url)) {
        return 'youtube';
    }
    else if (isVimeoUrl(url)) {
        return 'vimeo';
    }
    else if (isDailyMotionUrl(url)) {
        return 'dailymotion';
    }
    return null;
};
const provider = getProvider();
const EmbedComponent = provider ? providers[provider] : null;
</script>

<slot {provider} {EmbedComponent}>
	{#if EmbedComponent}
		<svelte:component this={EmbedComponent} {url} />
	{/if}
</slot>
