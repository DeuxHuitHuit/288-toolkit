<script lang="ts">
	import { isYoutubeUrl } from './youtube.js';
	import { isVimeoUrl } from './vimeo.js';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import YtEmbed from './YoutubeEmbed.svelte';
	import VimeoEmbed from './VimeoEmbed.svelte';
	import type { Maybe } from '@288-toolkit/types';
	import { Component } from 'svelte';

	interface Props {
		/**
		 * The url of the video. Already provided if this component is used inside an EmbedGroup.
		 */
		url?: Maybe<string>;
		children?: import('svelte').Snippet<
			[
				{
					provider: Maybe<keyof typeof providers>;
					EmbedComponent: Component;
				}
			]
		>;
	}

	let { url = getVideoEmbedContext()?.url, children }: Props = $props();

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

{#if children}
	{@render children({ provider, EmbedComponent })}
{:else if EmbedComponent}
	<EmbedComponent {url} />
{/if}
