<script context="module">export const DEFAULTS = {
    byline: false,
    title: false,
    portrait: false,
    autopause: true,
    background: false
};
</script>

<script>import { getVideoEmbedContext } from './EmbedGroup.svelte';
import { objectToQueryString } from '@288-toolkit/strings';
export let url;
export let title = null;
export let muted = false;
export let autoplay = true;
export let loop = false;
export let start = null;
export let options = DEFAULTS;
const api = getVideoEmbedContext();
const { playing, preconnect } = api || {};
const videoParams = url ? new URL(url).pathname.replace('/', '') : '';
const [videoId, unlistedHash] = videoParams.split('/');
const paramString = objectToQueryString({
    autoplay,
    muted,
    loop,
    ...options,
    h: unlistedHash || null
});
const src = videoId
    ? `https://player.vimeo.com/video/${videoId}?${paramString}${start ? `#t=${start}s` : ''}`
    : null;
$: _preconnect = $preconnect ?? false;
$: _playing = $playing ?? true;
</script>

<svelte:head>
	{#if _preconnect}
		<link rel="preconnect" href="https://player.vimeo.com" />
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
