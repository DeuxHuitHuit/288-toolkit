<script lang="ts">
	import { getVimeoThumbnailUrl, isVimeoUrl } from './vimeo';
	import { getYoutubeThumbnailUrl, isYoutubeUrl } from './youtube';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import type { Maybe } from '@288-toolkit/types';
	import { HtmlImg } from '@288-toolkit/html-elements';

	/**
	 * The url of the video. Already provided if this component is used inside an EmbedGroup.
	 */
	export let url: Maybe<string> = getVideoEmbedContext()?.url;
	/**
	 * The alt text for the image.
	 */
	export let alt: Maybe<string> = null;
	let classes = '';
	/**
	 * The classes to apply to the img element.
	 */
	export { classes as class };

	const getVendorThumbnailUrl = () => {
		if (!url) {
			return '';
		}
		return isYoutubeUrl(url)
			? getYoutubeThumbnailUrl(url)
			: isVimeoUrl(url)
				? getVimeoThumbnailUrl(url)
				: '';
	};

	const posterSrc = getVendorThumbnailUrl();
</script>

<HtmlImg src={posterSrc} {alt} class={classes} />
