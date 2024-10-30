<script lang="ts">
	export let autoplay = false;
	export let disableremoteplayback = true;
	export let muted = false;
	export let controls = true;
	export let el: HTMLVideoElement | undefined = undefined;

	const updateAttribute = (attr: string, value: boolean) => {
		if (el) {
			el[attr] = value;
		}
	};

	$: if (el) {
		updateAttribute('muted', muted);
		updateAttribute('controls', controls);
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	autoplay={autoplay ? true : null}
	playsinline={autoplay || null}
	{disableremoteplayback}
	x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	bind:this={el}
	{...$$restProps}
>
	<slot />
</video>
