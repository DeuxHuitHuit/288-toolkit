# Ui

A collection of functions, actions and stores to manipulate ui.

## `$mounted`

A store that tells you if a component has been mounted.

Credits: https://geoffrich.net/posts/svelte-lifecycle-examples/

## `$navigated`

A store that returns true when the user has navigated at least once.

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
