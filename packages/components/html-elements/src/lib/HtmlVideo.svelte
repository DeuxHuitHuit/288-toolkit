<script lang="ts">
	export let autoplay = false;
	export let disableremoteplayback = true;
	export let muted = false;
	export let controls = true;

	// These attributes are not well handled by Svelte (see https://github.com/sveltejs/svelte/issues/6536)
	// so we update them manually
	const setAttributes = (el: HTMLVideoElement) => {
		el.muted = muted;
		el.controls = controls;
	};
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	autoplay={autoplay ? true : null}
	playsinline={autoplay ? true : null}
	muted={muted ? true : null}
	controls={controls ? true : null}
	{disableremoteplayback}
	x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	use:setAttributes
	{...$$restProps}
>
	<slot />
</video>
