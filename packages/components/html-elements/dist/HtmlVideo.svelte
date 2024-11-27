<script lang="ts">
	interface Props {
		autoplay?: boolean;
		disableremoteplayback?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { autoplay = false, disableremoteplayback = true, children, ...rest }: Props = $props();
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video
	playsinline={autoplay || null}
	{autoplay}
	{disableremoteplayback}
	x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	{...rest}
>
	{@render children?.()}
</video>
