<script lang="ts">
	import { getVimeoThumbnailUrl, isVimeoUrl } from './vimeo.js';
	import { getYoutubeThumbnailUrl, isYoutubeUrl } from './youtube.js';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';
	import type { Maybe } from '@288-toolkit/types';
	import { HtmlImg } from '@288-toolkit/html-elements';

	interface Props {
		/**
		 * The url of the video. Already provided if this component is used inside an EmbedGroup.
		 */
		url?: Maybe<string>;
		/**
		 * The alt text for the image.
		 */
		alt?: Maybe<string>;
		class?: string;
	}

	let { url = getVideoEmbedContext()?.url, alt = null, class: classes = '' }: Props = $props();
	/**
	 * The classes to apply to the img element.
	 */

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
