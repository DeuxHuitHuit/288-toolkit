<script lang="ts">
	import { videoEmbedContext } from './videoEmbed.svelte.js';

	interface Props {
		/**
		 * The aria-label to use for the button. REQUIRED.
		 */
		label: string;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let { label, children, ...rest }: Props = $props();

	const api = videoEmbedContext.get();

	const { requestPreconnect, play } = api;
</script>

<button type="button" onpointerover={requestPreconnect} onclick={play} aria-label={label} {...rest}>
	{@render children?.()}
</button>
