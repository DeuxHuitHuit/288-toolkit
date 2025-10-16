<script>import { getVideoEmbedContext } from './EmbedGroup.svelte';
import { getDailyMotionId } from './dailymotion.js';
export let url;
export let title = null;
const api = getVideoEmbedContext();
const { playing, preconnect } = api || {};
const videoId = url ? getDailyMotionId(url) : null;
const src = videoId ? `https://geo.dailymotion.com/player.html?video=${videoId}` : null;
$: _playing = $playing ?? true;
</script>

{#if src && _playing}
	<iframe
		{title}
		{src}
		class="h-full w-full"
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
{/if}
