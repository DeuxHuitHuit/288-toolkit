<script lang="ts">
	import { getVimeoThumbnailUrl, isVimeoUrl } from './vimeo.js';
	import { getYoutubeThumbnailUrl, isYoutubeUrl } from './youtube.js';
	import { videoEmbedContext } from './videoEmbed.svelte.js';
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
		[key: string]: unknown;
	}

	const api = videoEmbedContext.get();

	let { url = api?.url, alt = null, ...rest }: Props = $props();

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

<HtmlImg src={posterSrc} {alt} {...rest} />
