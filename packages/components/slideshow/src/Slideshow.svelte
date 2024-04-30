<!--@docs
The Slideshow component provides all of the logic to create your
own slideshow. Simply put, it's a controllable interval with
`next` and `previous` functions to switch slides.

Note that this component renders no markup.

### Example

```
<Slideshow items={[1, 2, 3, 4]} let:item>
	<div class="bg-[red]">Slide {item}</div>
</Slideshow>
```
-->
<script lang="ts" context="module">
	import { sleep } from '@288-toolkit/timeout';
	import { getContext, onMount, setContext } from 'svelte';

	export interface SlideshowContext {
		previous: () => void;
		next: () => void;
	}

	const CONTEXT_KEY = '__slideshow__';

	export const getSlideshowContext = () => getContext<SlideshowContext>(CONTEXT_KEY);
</script>

<script lang="ts">
	type T = $$Generic;

	/**
	 * The items to loop over in the slideshow
	 */
	export let items: Array<T>;
	/**
	 * The duration of each individual slide, in milliseconds
	 */
	export let slideDuration = 3500;
	/**
	 * Whether the slideshow should run on its own. If this is
	 * set to `false`, only clicking on a `SlideshowButton` will
	 * allow to move from slide to slide.
	 */
	export let autoplay = true;
	/**
	 * Whether the slideshow should go back to the first slide
	 * when doing `next` from the last slide; and, conversely,
	 * whether the slideshow should go to the last slide when
	 * doing `previous` from the first slide.
	 */
	export let loop = true;
	/**
	 * The delay in ms before the slideshow starts
	 */
	export let startDelay = 0;

	let index = 0;

	const increment = () => {
		if (index < items?.length - 1) {
			index += 1;
		} else if (loop) {
			index = 0;
		}
	};

	const decrement = () => {
		if (index !== 0) {
			index -= 1;
		} else if (loop) {
			index = items?.length - 1;
		}
	};

	const makeInterval = () => {
		if (autoplay) {
			return setInterval(increment, slideDuration);
		}
	};

	// This is the first interval to be set, when
	// mounting the component. It will be cancelled
	// and replaced if `previous` or `next` is
	// called.
	let interval: ReturnType<typeof setInterval> | undefined;

	// This will be called by the `next` and `previous`
	// functions passed to `SlideshowButton`.
	const resetInterval = () => {
		clearInterval(interval);
		interval = makeInterval();
	};

	onMount(() => {
		if (startDelay) {
			sleep(startDelay).then(() => {
				interval = makeInterval();
			});
		} else {
			interval = makeInterval();
		}
		return () => {
			clearInterval(interval);
		};
	});

	setContext<SlideshowContext>(CONTEXT_KEY, {
		previous: () => {
			decrement();
			resetInterval();
		},
		next: () => {
			increment();
			resetInterval();
		}
	});
</script>

<!--@docs
	#### Slot props

	- readonly `item` (`T`): The item currently shown by the slideshow
	- readonly `index` (`number`): The index of the item currently shown by the slideshow
-->
<slot item={items[index]} {index} />
