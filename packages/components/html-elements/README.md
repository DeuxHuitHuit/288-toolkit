# Html-elements

```sh
npm i @288-toolkit/html-elements
```

A collection of convenient wrapper components around basic html elements.

## `HtmlAnchor.svelte`

Renders an HTML link (anchor). External links will have `noopener noreferrer` rel and `_blank`
target attributes applied. The only required prop is `href`.

## Children props

-   `external` (`boolean`): Wether the url is an external url.

## `HtmlImg.svelte`

A wrapper around an html `<img>` element.

-   Automatically adds an empty alt attribute.
-   Only outputs `src` if there is no `srcset`.

## `HtmlVideo.svelte`

A wrapper around an html video element.

-   Automatically adds `playsinline` if `autoplay` is `true`.
-   Automatically adds `disableremoteplayback` (can be removed by passing
    `disableremoteplayback={false}`)
-   Automatically manages `x-webkit-airplay` attribute.

## `HtmlTime.svelte`

A wrapper component arund the <time> html element.

## Props

-   `date` (`Date`): The date to display
-   `formatOptions` (`FormatDateOptions`): The date formatting options (see
    [format package](../format/README.md))

## Children props

-   `formattedDate` (`string`): The formatted date

## Examples

```svelte
<Time
	date={new Date('2023-04-17T21:34:50.360Z')}
	formatOptions={{ day: 'numeric', month: 'long', year: 'numeric' }}
/>
```

```svelte
<Time date={new Date('2023-04-17T21:34:50.360Z')} formatOptions={{ day: 'numeric', month: 'long' }}>
	{#snippet children({ formattedDate })}
		<span class="text-[red]">
			{formattedDate}
		</span>
	{/snippet}
</Time>
```
