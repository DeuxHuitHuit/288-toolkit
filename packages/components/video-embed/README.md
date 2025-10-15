# Video-embed

A collection of Svelte components and functions to work with Vimeo and Youtube embeds.

## Components

### `EmbedGroup.svelte`

An embed group that provides a context for video embeds.

#### Props

-   `url` (`string`): The url of the video.

#### Slot props

Slot props are also available via `getVideoEmbedContext()`.

-   `playing` (`boolean`): `true` if the video embed is currently loaded and playing.
-   `play` (`() => void`): Play the video.
-   `requestPreconnect` (`() => void`): Request preconnection to the embed domains.
-   `preconnect` (`boolean`): `true` if preconnect has been requested
-   `url` (`string`): The URL of the video

### `EmbedPlayButton.svelte`

A button that calls `requestPreconnect` when hovered and plays the video on click.

#### Props

-   `class` (`string`): The classes to apply to the button element.

### `EmbedThumbnail.svelte`

An img element that renders the default video thumbnail. Make sure to setup the
`vimeo-thumbnail.jpg` endpoint before using (documented below).

#### Props

-   `url` (`string`): The url of the video. Already provided if this component is used inside an
    `EmbedGroup`.
-   `alt` (`string`): The alt text for the image.
-   `class` (`string`): The classes to apply to the img element.

### `EmbedSelector.svelte`

A selector component that automatically determines the provider and renders the appropriate embed.
For more control over how the markup is rendered, the component has a slot that provides the embed
component.

#### Props

-   `url` (`string`): The url of the video. Already provided if this component is used inside an
    `EmbedGroup`.

#### Slot props

-   `provider` (`'vimeo' | 'youtube' | 'dailymotion`): The embed provider, determined from the url.

-   `EmbedComponent` (`SvelteComponent`): The Svelte component of the embed.

### `YoutubeEmbed.svelte`

The Youtube embed component. Automatically rendered by `EmbedSelector`.

### `VimeoEmbed.svelte`

The Vimeo embed component. Automatically rendered by `EmbedSelector`.

### `DailymotionEmbed.svelte`

The DailyMotion embed component. Automatically rendered by `EmbedSelector`.

## Example

```svelte
<script lang="ts">
	import type { AssetInterface } from 'src/craft';
	import { fade } from 'svelte/transition';
	import EmbedGroup from '$com/ui/video-embed/EmbedGroup.svelte';
	import EmbedSelector from '$com/ui/video-embed/EmbedSelector.svelte';
	import EmbedPoster from '$com/ui/video-embed/decoration/EmbedPoster.svelte';
	import EmbedPlayButton from '$com/ui/video-embed/decoration/EmbedPlayButton.svelte';
	import PlayIcon from '$com/ui/PlayIcon.svelte';
	import LazyMedia from '$com/ui/LazyMedia.svelte';

	export let embedUrl: Maybe<string>;
	export let poster: Maybe<AssetInterface>;
</script>

<EmbedGroup url={embedUrl} let:playing>
	<div class="grid-stack grid aspect-[2/1] w-full overflow-hidden rounded">
		<EmbedSelector />
		{#if !playing}
			<div class="h-full w-full" out:fade={{ duration: 200 }}>
				<EmbedPlayButton>
					<div class="grid-stack grid h-full w-full place-items-center">
						{#if poster}
							<Media media={poster} class="h-full w-full object-cover" />
						{:else}
							<EmbedThumbnail />
						{/if}
						<PlayIcon />
					</div>
				</EmbedPlayButton>
			</div>
		{/if}
	</div>
</EmbedGroup>
```

## Functions

### `isYoutubeUrl()`

Check if a URL is a valid YouTube URL

### `getYoutubeId()`

Get the YouTube video ID from a URL

### `getYoutubeThumbnailUrl()`

Get the URL of a YouTube video thumbnail

## `isVimeoUrl()`

Check if a URL is a valid Vimeo URL

### `getVimeoId()`

Get the Vimeo video ID from a URL

### `getVimeoThumbnailUrl()`

Get the URL of a Vimeo video thumbnail. Make sure to setup the `vimeo-thumbnail.jpg` route in your
app (see below).

### `vimeoThumbnail` request handler

To be able to simply generate a vimeo thumbnail from a Vimeo video url (like we can do for Youtube),
you must make an API call to Vimeo. To simplify this, you can setup a server route in your Sveltekit
app that handles this with the `vimeoThumbnailHandler`.

Note that `getVimeoThumbnailUrl()` and `EmbedThumbnail.svelte` expect the endpoint to be
`/vimeo-thumbnail.jpg`, so for these to work properly, add the following route to your app:

`src/routes/vimeo-thumbnail.jpg/+server.ts`:

```ts
import { vimeoThumbnailHandler } from '@288-toolkit/video-embed';

export const GET = vimeoThumbnailHandler;
```
