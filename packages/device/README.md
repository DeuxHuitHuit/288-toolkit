# Device

A collection of functions, stores and actions to work with the user's device.

## Media

### `createMatcheMediaStore`

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
