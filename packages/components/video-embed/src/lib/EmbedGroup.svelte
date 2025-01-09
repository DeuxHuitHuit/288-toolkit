<script lang="ts">
	import type { Maybe } from '@288-toolkit/types';
	import { VideoEmbedApi, videoEmbedContext } from './videoEmbed.svelte.js';

	interface Props {
		url?: Maybe<string>;
		children?: import('svelte').Snippet<[VideoEmbedApi]>;
	}

	let { url = null, children }: Props = $props();

	const api = videoEmbedContext.set(new VideoEmbedApi(url));
</script>

{@render children?.(api)}
