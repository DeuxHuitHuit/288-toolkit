# Css

```sh
npm i @288-toolkit/css
```

A collection of useful css files. Must be used with Tailwindcss.

## `viewport.css`

Makes `rem` units responsive between to viewport sizes.

The `min` and `max` viewport sizes must be set in your Tailwind config as screens.

We recommend `360px` and `1600px` respectively.

```ts
export default {
	theme: {
		screens: {
			min: '360px',
			max: '1600px
		}
	}
}
```

When the viewport is below the `min`, 1 rem equals 9px, which is the smallest value allowed by
Safari.

When the viewport is above the `max`, 1 rem equals 10px.

When the viewport is between `min` and `max`, 1 rem is tied to the viewport width. The system
defines two reference points for scaling. These are configurable via css variables that you can
define on the `:root`.

-   Mobile: Between `min` and `--max-viewport-mobile`, which is 800 by default, 1 rem equals `2vw`.
-   Desktop: Between `--max-viewport-mobile` and `--max-viewport-desktop`, which is 1600 by default,
    1 rem equals `1vw`.

## `reset.css`

A css reset, added on top of Tailwind's own preflight.css.

## `watchdog.css`

[!NOTE] To be used in dev mode only.

Some useful visual cues to detect faulty markup and styles.
