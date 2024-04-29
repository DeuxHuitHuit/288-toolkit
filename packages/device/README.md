# Device

A collection of functions, stores and actions to work with the user's device.

## Media

### `createMatchMediaStore`

A readable store which is true when the media query matches and false when it doesn't.

```ts
const reducedData = createMatchMediaStore('(prefers-reduced-data)');

$: if ($reducedData) {
	// ...
} else {
	// ...
}
```

### `isTouch`

A readable store that returns whether the user is using a touch device.

### `reducedMotion`

A readable store that returns whether the user has requested reduced motion.

### `runOnMatchMedia`

A function that allows you to run a callback only when the media matches the specified condition
('matches' or 'doesNotMatch'). The callback can return a cleanup function that will be called when
the media changes.

The media is determined by the `MediaStore` store (see `createMatchMediaStore`).

```ts
import { runOnMatchMedia, createMediaMediaStore } from '@288-toolkit/device/media';

// Run a callback only when the viewport size is below 800px
const destroy = runOnMatchMedia(createMediaMediaStore('(max-width: 800px)'), 'matches', () => {
	// do something
});

// Later, when you want to unsubscribe from the store and call the cleanup function if it exists
destroy();
```

### `runActionOnMatchMedia`

Uses `runOnMatchMedia` to run a Svelte action only when the media matches the specified condition.

The action can be typed via generic params.

```ts
import { runActionOnMatchMedia, createMediaMediaStore } from '@288-toolkit/device/media';
import { scroll } from 'motion';

// Run a Svelte action only when the viewport size is below 1200px
const myAction = runActionOnMatchMedia<
	HTMLButtonElement,
	{
		test: string;
	},
	{ 'on:visible': (e: CustomEvent) => void }
>(createMediaMediaStore('(min-width: 1200px)'), 'doesNotMatch', (node, params) => {
	const unsubscribe = scroll(() => {
		// do something
	});
	return {
		destroy: () => {
			unsubscribe();
		},
		update: (params) => {
			// Code here will only be run when the params change and the viewport size is below 1200px
		}
	};
});
```

## Window

### `createWindowEventStore`

Create a readable store that listens to a window event. Using a store has the advantage of having
multiple event handlers for the same event listener, which is good for memory management.

You can create a store for any window event. This package already exports the following:

-   `click`
-   `clickUseCapture`
-   `focus`
-   `focusin`
-   `keydown`
-   `pointerdown`
-   `resize`
-   `scroll`

### `currentScroll`

A readable store that returns the current scroll positions of the user (x and y).
