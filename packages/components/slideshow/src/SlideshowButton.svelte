<!--@docs
The SlideshowButton component must be a child of Slideshow.
It renders a button that will either move the slideshow to
the previous or the next slide.

Usually, this button will be used twice: once for `previous`,
and once more for `next`.

### Example

```
<SlideshowButton direction="next">
	Next
</SlideshowButton>
```
-->
<script lang="ts">
	import { t } from './translations/index.js';
	import { getSlideshowContext } from './Slideshow.svelte';

	/**
	 * The direction of the button.
	 */
	export let direction: 'previous' | 'next';

	let classes = '';
	/**
	 * Classes to apply to the button.
	 */
	export { classes as class };

	const drawer = getSlideshowContext();
	const { previous, next } = drawer;

	const label = t(direction === 'previous' ? 'prevSlide' : 'nextSlide');
</script>

<button
	type="button"
	class={classes}
	aria-label={label}
	on:click={direction === 'previous' ? previous : next}
>
	<slot />
</button>
