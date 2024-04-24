<script context="module" lang="ts">
	export type YoutubeEmbedOptions = {
		/** https://developers.google.com/youtube/player_parameters#Parameters */
		cc_lang_pref?: string;
		cc_load_policy?: boolean;
		color?: 'red' | 'white';
		controls?: boolean;
		disablekb?: boolean;
		enablejsapi?: boolean;
		end?: string;
		fs?: boolean;
		hl?: string;
		iv_load_policy?: boolean;
		list?: string;
		listType?: 'playlist' | 'user_uploads';
		modestbranding?: boolean;
		origin?: string;
		playlist?: string;
		playsinline?: boolean;
		rel?: boolean;
		widget_referrer?: string;
	};

	export const DEFAULTS: YoutubeEmbedOptions = {} as const;
</script>

<script lang="ts">
	/** Based on https://github.com/paulirish/lite-youtube-embed */
	import { getYoutubeId } from './youtube';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import type { Maybe } from '@288-toolkit/types';
	import { objectToQueryString } from '@288-toolkit/strings';

	export let url: Maybe<string>;
	export let title: Maybe<string> = null;
	export let muted = false;
	export let autoplay = true;
	export let loop = false;
	export let start: Maybe<number> = null;
	export let options: Maybe<YoutubeEmbedOptions> = DEFAULTS;

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
