# Animations

```sh
npm i @288-toolkit/animations
```

A collection of functions and actions to animate elements.

## `createAnimationArchitect()`

An architect allows you to register animation functions that will get played when transitioning out
from a page, which is useful to coordinate multiple outro animations. The architect instance has to
be initialized with the provided `start` function in order to work, which is a wrapper around
[`registerTransition`](../page-transition/README.md).

The animations will not be played if the user has reduced motion.

### Options

#### `outDuration`

The outro duration in ms that the animations must be played for. Default: `400`.

### Returns

#### `start`

A wrapper around `registerTransition` that initializes the architect. This function MUST be called
at component initialization. It accepts the same arguments and returns the `transitioning` reactive
object for the registered transition.

#### `registerAnimation`

The function to register your outro animation. The outro animation is simply a function that
receives the `duration` in seconds and `durationMs` in milliseconds, which is the `outDuration`
passed to the architect.

### Example

```ts
const architect = createAnimationArchitect({ outDuration: 350 });
```

```svelte
<script lang="ts">
	import { architect } from '$lib/animations/defaultArchitect';

	architect.start('default');
</script>

<script lang="ts">
	import {onMount} from 'svelte';

	let myEl: HTMLElement

	onMount(() => {
		architect.registerAnimation(({ durationMs }) => {
			// ... animate myEl before navigating away from the page
		})
	})
</script>
```

## `createMotionArchitect`

A wrapper around `createAnimationArchitect` to handle [Motion](https://motion.dev/) animations.

It accepts the same arguments and An architect instance extended with `registerMotionAnimation`.
This function takes the animation controls returned from `animate` or `timline` and automatically
reverses the animation when transitioning out.

```svelte
<script lang="ts">
	onMount(() => {
		architect.registerMotionAnimation(
			animate(
				myEl,
				{
					opacity: [0, 1]
				},
				{ duration: 0.3 }
			)
		);
	});
</script>
```

## `use:playMotionAnimationInView`

Plays a [Motion](https://motion.dev/) animation when the element comes into view, using
[Motion's `inView` function](https://motion.dev/dom/in-view). Registers it with an optional
architect (see `createMotionArchitect`) so that if the element is in view when a navigation occurs,
the animation will be reversed (which can be turned off with `reverse: false`). Make sure that the
animation is set to `autoplay: false`, otherwise it will play immediately, potentially before the
element is in view.

The animation will be skipped to its final state if the user has reduced motion.

### Options

#### animation

The animation to play, returned from either `animate` or `timeline` from Motion.

```ts
animation: AnimationControls;
```

#### architect

The architect to register the animation with. If provided, the animation will be unregistered when
the element is out of view and reversed if the element is in view when a navigation occurs.

```ts
architect?: ReturnType<typeof createMotionArchitect>;
```

#### reverse

Whether to reverse the animation when the element is out of view. DEFAULT: `true`.

```ts
reverse?: boolean;
```

#### inViewOptions

The options to pass to the `inView` function.

```ts
inViewOptions?: InViewOptions;
```

### Example

```svelte
<div
	use:playMotionAnimationInView={{
		animation: animate(el, {
			/*...*/
		}),
		reverse: false,
		inViewOptions: {
			amount: 0.8
		}
	}}
></div>
```

## `use:animateInView`

Wraps `playMotionAnimationInView` and:

-   Makes sure that the `animation` has `autoplay: false`
-   Provides a nice API to select multiple elements within the node.
-   Allows disabling the animation.

### Options

`animateInView` has the same options as `playMotionAnimationInView` except `animation`, as well as
the following.

#### keyframes

The keyframes of the animation.

```ts
keyframes: MotionKeyframesDefinition;
```

#### options

The animation options.

```ts
options?: AnimationOptionsWithOverrides;
```

#### selector

A CSS selector find elements within the node to animate. If omitted, the node itself will be
animated.

```ts
selector?: string;
```

#### disabled

Disables the animation. DEFAULT: false.

```ts
disabled?: boolean;
```

### Example

```svelte
<ul
	use:playMotionAnimationInView={{
		keyframes: {
			transform: ['translateY(4rem)', 'none'],
			opacity: [0, 1]
		},
		options: {
			transform: {
				ease: expoOut,
				duration: 0.7
			},
			opacity: {
				ease: 'linear',
				duration: 0.2
			},
			delay: stagger(0.1)
		},
		selector: 'li',
		inViewOptions: {
			amount: 0.4
		}
	}}
>
	{#each items as item}
		<li>{item}</li>
	{/each}
</ul>
```

## `use:slide`

An action to animate the height of an element.It uses `tweened` store to animate the element, which
you can configure.

[!NOTE] Why not use `slide` from `svelte/transition`? It's still a very good choice, but svelte
transitions require the elements to be mounted/unmounted from the DOM to be animated. Sometimes you
might want to keep the elements in the DOM, for example to get a better SEO score for the page. In
that case, the `slide` action is prefered.

### Options

#### open

Determines if the element is collapsed or not.

```ts
open: boolean;
```

#### options

The options of the `tweened` store, so you can adjust the duration, easing, etc. The `duration` will
be overriden to 0 if the user has reduced motion.

```ts
options: Parameters < typeof tweened < number >> [1];
```

#### closedHeight

The height of the element when `open` is false.

```ts
closedHeight: number;
```

### Example

```svelte
<div use:slide={{ open: $open, options: { duration: 700, ease: expoOut }, closedHeight: 50 }}></div>
```

## `use:parallax`

Creates a parallax effect on an element using [Motion](https://motion.dev/). The parallax will be
re-initialized when the options change, so you can update them dynamically to match certain
conditions, like mobile and desktop options.

### Options

#### speed

Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT:
0.2.

```ts
speed?: number;
```

#### ease

Easing of the animation. DEFAULT: 'linear'.

```ts
ease?: Easing;
```

#### keyframes

Extra keyframes to add more animation effects.

```ts
keyframes?: MotionKeyframesDefinition;
```

## Example

```svelte
<script lang="ts">
	import { createMatchMediaStore } from '@288-toolkit/device/media';

	const isDesktop = createMatchMediaStore('(min-width: 1200px)');
</script>

<div
	use:parallax={{
		speed: $isDesktop ? 0.4 : 0.2
	}}
></div>
```

## `use:parallaxFade`

Adds a fade animation to the basic parallax.

### Options

#### from

Opacity at the start of the animation. DEFAULT: 0.

```ts
from?: number;
```

#### to

Opacity at the end of the animation. DEFAULT: 1.

```ts
to?: number;
```

#### speed

Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT:
0.2.

```ts
speed?: number;
```

#### ease

Easing of the animation. DEFAULT: 'linear'.

```ts
ease?: Easing;
```

## `use:parallaxScale`

Adds a scale animation to the basic parallax. The element has a scale of 1 at the middle of the
animation.

### Options

#### from

Scale at the start of the animation. DEFAULT: 0.5.

```ts
from?: number;
```

#### to

Scale at the end of the animation. DEFAULT: 0.5.

```ts
to?: number;
```

#### speed

Speed of the animation. Negative values invert the direction. 0 disables the animation. DEFAULT:
0.2.

```ts
speed?: number;
```

#### ease

Easing of the animation. DEFAULT: 'linear'.

```ts
ease?: Easing;
```

### `augmentedParallax()`

A convenience function to augment the basic `parallax` action with more animation effects.

See [`parallaxFade`](./src/parallaxFade.ts) and [`parallaxScale`](./src/parallaxScale.ts) for
examples.

## v4 to v5 migration guide

-   v5 uses `motion` v12, `svelte` v5 and `@288-toolkit/page-transition` v4, so you should update
    those dependencies first. You can also consult the migration guides for
    [`motion`](https://motion.dev/docs/upgrade-guide) and
    [`svelte`](https://svelte.dev/docs/svelte/v5-migration-guide).
-   Since `motion` v11, the `easing` has been changed option to `ease`, the `easing` option for
    `parallax`, `parallaxScale` and `parallaxFade` has been deprecated in favor of `ease`.
-   The return value `createAnimationArchitect` and `createMotionArchitect` has been changed from a
    Svelte store to a reactive object with a `current` property.
