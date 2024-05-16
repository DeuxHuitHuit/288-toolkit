<script context="module" lang="ts">
	export type VimeoEmbedOptions = {
		h?: string;
		title?: boolean | string; // show title
		byline?: boolean | string; // show 'by' line
		portrait?: boolean | string; // show portrait
		autopause?: boolean | string; // mandatory if you have multiple vimeo embeds on the same page on autoplay
		background?: boolean; // background mode (no controls, no nothing)
	};

	export const VIMEO_DEFAULTS: VimeoEmbedOptions = {
		byline: false,
		title: false,
		portrait: false,
		autopause: true,
		background: false
	} as const;
</script>

<script lang="ts">
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import { objectToQueryString } from '@288-toolkit/strings';
	import type { Maybe } from '@288-toolkit/types';

	export let url: Maybe<string>;
	export let title: Maybe<string> = null;
	export let muted = false;
	export let autoplay = true;
	export let loop = false;
	export let start: Maybe<number> = null;
	export let options: VimeoEmbedOptions = VIMEO_DEFAULTS;

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
