<script lang="ts">
	import { t } from './translations/index.js';
	import { getVideoEmbedContext } from './EmbedGroup.svelte';

	let classes = '';
	/**
	 * The classes to apply to the button element.
	 */
	export { classes as class };

	const api = getVideoEmbedContext();
	const { requestPreconnect, play } = api;
</script>

<button
	class={classes}
	type="button"
	on:pointerover={requestPreconnect}
	on:click={play}
	aria-label={t('play')}
>
	<slot />
</button>
