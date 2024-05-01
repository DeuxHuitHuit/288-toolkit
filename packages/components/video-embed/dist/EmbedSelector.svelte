<script>import { isYoutubeUrl } from './youtube.js';
import { isVimeoUrl } from './vimeo.js';
import { getVideoEmbedContext } from './EmbedGroup.svelte';
import YtEmbed from './YoutubeEmbed.svelte';
import VimeoEmbed from './VimeoEmbed.svelte';
/**
 * The url of the video. Already provided if this component is used inside an EmbedGroup.
 */
export let url = getVideoEmbedContext()?.url;
const providers = {
    youtube: YtEmbed,
    vimeo: VimeoEmbed
};
const provider = isYoutubeUrl(url)
    ? 'youtube'
    : isVimeoUrl(url)
        ? 'vimeo'
        : null;
const EmbedComponent = provider ? providers[provider] : null;
</script>

<slot {provider} {EmbedComponent}>
	{#if EmbedComponent}
		<svelte:component this={EmbedComponent} {url} />
	{/if}
</slot>
