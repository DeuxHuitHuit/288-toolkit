<script module lang="ts">
	export type VimeoEmbedOptions = {
		h?: string;
		/**
		 * Show the title.
		 */
		title?: boolean | string;
		/**
		 * Show the 'by' line.
		 */
		byline?: boolean | string;
		/**
		 * Show the portrait.
		 */
		portrait?: boolean | string;
		/**
		 * Autopause. Mandatory if you have multiple vimeo embeds on the same page on autoplay
		 */
		autopause?: boolean | string;
		/**
		 * Background mode (no controls, no nothing).
		 */
		background?: boolean;
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
	import { videoEmbedContext } from './videoEmbed.svelte.js';
	import { objectToQueryString } from '@288-toolkit/strings';
	import type { Maybe } from '@288-toolkit/types';

	interface Props {
		url: Maybe<string>;
		title?: Maybe<string>;
		muted?: boolean;
		autoplay?: boolean;
		loop?: boolean;
		start?: Maybe<number>;
		options?: VimeoEmbedOptions;
	}

	let {
		url,
		title = null,
		muted = false,
		autoplay = true,
		loop = false,
		start = null,
		options = VIMEO_DEFAULTS
	}: Props = $props();

	const api = videoEmbedContext.get();

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

	let _preconnect = $derived(api?.preconnect ?? false);
	let _playing = $derived(api?.playing ?? true);
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
	></iframe>
{/if}
