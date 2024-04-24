<script lang="ts">
	import { isYoutubeUrl } from './youtube';
	import { isVimeoUrl } from './vimeo';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import YtEmbed from './YoutubeEmbed.svelte';
	import VimeoEmbed from './VimeoEmbed.svelte';
	import type { Maybe } from '@288-toolkit/types';

	/**
	 * The url of the video. Already provided if this component is used inside an EmbedGroup.
	 */
	export let url: Maybe<string> = getVideoEmbedContext()?.url;

	const providers = {
		youtube: YtEmbed,
		vimeo: VimeoEmbed
	};

	const provider: Maybe<keyof typeof providers> = isYoutubeUrl(url)
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
