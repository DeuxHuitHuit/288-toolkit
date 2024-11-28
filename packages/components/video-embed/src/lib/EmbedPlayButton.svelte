<script lang="ts">
	import { t } from './translations/index.js';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';

	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: classes = '', children }: Props = $props();
	/**
	 * The classes to apply to the button element.
	 */

	const api = getVideoEmbedContext();
	const { requestPreconnect, play } = api;
</script>

<button
	class={classes}
	type="button"
	onpointerover={requestPreconnect}
	onclick={play}
	aria-label={t('play')}
>
	{@render children?.()}
</button>
