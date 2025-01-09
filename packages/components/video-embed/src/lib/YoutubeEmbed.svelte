<script module lang="ts">
	/**
	 * See https://developers.google.com/youtube/player_parameters#Parameters for more information.
	 */
	export type YoutubeEmbedOptions = {
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

	export const YOUTUBE_DEFAULTS: YoutubeEmbedOptions = {} as const;
</script>

<script lang="ts">
	/** Based on https://github.com/paulirish/lite-youtube-embed */
	import { getYoutubeId } from './youtube.js';
	import { videoEmbedContext } from './videoEmbed.svelte.js';
	import type { Maybe } from '@288-toolkit/types';
	import { objectToQueryString } from '@288-toolkit/strings';

	interface Props {
		url: Maybe<string>;
		title?: Maybe<string>;
		muted?: boolean;
		autoplay?: boolean;
		loop?: boolean;
		start?: Maybe<number>;
		options?: Maybe<YoutubeEmbedOptions>;
	}

	let {
		url,
		title = null,
		muted = false,
		autoplay = true,
		loop = false,
		start = null,
		options = YOUTUBE_DEFAULTS
	}: Props = $props();

	const videoId = url ? getYoutubeId(url) : null;
	const playlist = loop ? videoId : options?.playlist || null;

	const api = videoEmbedContext.get();

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

	let _preconnect = $derived(api?.preconnect ?? false);
	let _playing = $derived(api?.playing ?? true);
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
	></iframe>
{/if}
