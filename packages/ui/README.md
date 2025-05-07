# Ui

```sh
npm i @288-toolkit/ui
```

A collection of functions, actions and stores to manipulate ui.

## DEPRECATED `$mounted`

Use [`IsMounted`](https://runed.dev/docs/utilities/is-mounted) from Runed instead.

~~A store that tells you if a component has been mounted.~~

~~Credits: https://geoffrich.net/posts/svelte-lifecycle-examples/~~

## `navigated`

A reactive object with a `current` property that is true when the user has navigated at least once.

## `motionSafeScrollBehavior()`

Returns the appropriate scroll behavior based on the user's preference for reduced motion.

## `Keys`

A re-export of https://github.com/nfriend/ts-key-enum

Keyboard key names, corresponding to `event.key` (`KeyboardEvent['key']`).

## `focusableSelector`

A CSS selector that matches all focusable elements.

Credit: https://stackoverflow.com/a/30753870

## `isFocusable()`

Returns true if the given element is focusable.

```ts
const isFocusable: (el: HTMLElement) => boolean;
```

## `focalPointToObjectPosition()`

Converts a focal point value between 0 and 1 to a CSS object-position value.

```ts
const focalPointToObjectPosition: (focalPoint: number) => string;
```

## `imageSizes()`

Converts an array of `ImageSizes` into a string that can be used as the `sizes` attribute of an
`<img>` element.

```ts
type ImageSize = {
	/**
	 * The displayed width of the image
	 */
	width: `${number}${ImageSizeUnits}`;
	/**
	 * An optional media query dictating when the image will be displayed
	 * at this width.
	 */
	mq?: `(${ImageSizeSupportedMediaQuery}: ${number}${ImageSizeMediaQueryUnits})`;
};

type ImageSizes = ImageSize[];

const imageSizes: (sizes: ImageSizes) => string;
```

## `initials()`

Convert a name to initials.

```ts
/**
 * @param name The name to convert.
 * @param max The maximum length of the initials.
 */
const initials: (name: string, max = Infinity) => string;
```

## `formatInitials()`

Formats initials by joining them with a string.

```ts
/**
 * @param initials The initials to format.
 * @param join The string to join the initials with.
 */
const formatInitials: (initials: string, join: string) => string;
```

## `fontSizeFromInitials()`

Get the proper font size for the initials. The font sizes are based on the length of the initials.
If the initials are longer than the font sizes, the last font size is used.

```ts
/**
 * @param initials The initials to get the font size for.
 * @param fontSizes The font sizes to use.
 */
const fontSizeFromInitials: (initials: string, fontSizes: readonly string[]) => string;
```

## `portal`

Renders the element in a different part of the DOM. Accepts a css selector or an `HTMLElement` as
the target.

Based on https://github.com/romkor/svelte-portal/tree/master

```svelte
<div use:portal={'css selector'}></div>
```

## `clickOutside`

Run a callback when a click outside of the element occurs.

```svelte
<div
	use:clickOutside={() => {
		console.log('clicked outside!');
	}}
></div>
```

## `scrollIntoView`

Scroll an element into view on mount and on update. The scroll behavior is will be overriden to
`instant` if the user has reduced motion, otherwhise it will be `smooth` by default.

It accepts the same options as the native `scrollIntoView` function extended with `canScroll`, which
determines if the element can be scrolled to or not.

```svelte
 <div use:scrollIntoView={{
	canScroll: $someCondition,
	block: 'nearest',
	// ... other ScrollIntoViewOptions
 }}>
```

## `autofocus`

Focus an element on mount and on update.

It accepts the same options as the native `focus` function extended with `canFocus`, which
determines if the element can be scrolled to or not.

```svelte
 <div use:autofocus={{
	canFocus: $someCondition,
	preventScroll: true;
 }}>
```

## `autofocusAfterTick`

Focus an element on mount and on update after `tick()` resolves.

Options are the same as `autofocus`.

## `autofocusWithDelay`

Focus an element on mount or on update after a delay.

[!NOTE] Please note that adding a delay will change the focus behavior on mobile: we get the visual
indicator that the element is focused, but the keyboard will not open automatically.

Options are the same as `autofocus` extended with `delay`.

```svelte
 <div use:autofocusWithDelay={{
	canFocus: $someCondition,
	delay: 100;
 }}>
```

## `scrollToAnchor`

Smoothly scroll to the anchor link's target (except if user has reduced motion).

The node has to be an `HTMLAnchorElement`.

```svelte
<a href="#section" use:scrollToAnchor>Section</a>
```
