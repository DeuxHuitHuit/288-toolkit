<script lang="ts">
	export let autoplay = false;
	export let disableremoteplayback = true;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	playsinline={autoplay || null}
	{autoplay}
	{disableremoteplayback}
	x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	{...$$restProps}
>
	<slot />
</video>
