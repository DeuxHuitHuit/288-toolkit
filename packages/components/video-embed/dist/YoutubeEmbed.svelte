<script context="module">export const YOUTUBE_DEFAULTS = {};
</script>

<script>/** Based on https://github.com/paulirish/lite-youtube-embed */
import { getYoutubeId } from './youtube.js';
import { getVideoEmbedContext } from './EmbedGroup.svelte';
import { objectToQueryString } from '@288-toolkit/strings';
export let url;
export let title = null;
export let muted = false;
export let autoplay = true;
export let loop = false;
export let start = null;
export let options = YOUTUBE_DEFAULTS;
const videoId = url ? getYoutubeId(url) : null;
const playlist = loop ? videoId : options?.playlist || null;
const api = getVideoEmbedContext();
const { playing, preconnect } = api || {};
const paramString = objectToQueryString({
    autoplay: autoplay ? '1' : autoplay,
    mute: muted,
    loop,
    start,
    playlist,
    controls: options?.controls ? 1 : null,
    rel: options?.rel ? 1 : null,
    ...options
});
const src = !videoId
    ? null
    : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${paramString}`;
$: _preconnect = $preconnect ?? false;
$: _playing = $playing ?? true;
</script>

<svelte:head>
	{#if _preconnect}
		<link rel="preconnect" href="https://www.youtube-nocookie.com" />
		<link rel="preconnect" href="https://www.google.com" />
	{/if}
</svelte:head>

{#if src && _playing}
	<iframe
		{title}
		{src}
		class="h-full w-full"
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
{/if}
