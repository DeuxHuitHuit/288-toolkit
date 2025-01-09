# Video-embed

A collection of Svelte components and functions to work with Vimeo and Youtube embeds.

## Structure

```svelte
<script>
	import { VideoEmbed } from '@288-toolkit/video-embed';

	const embedUrl = 'https://youtube.com/watch?v=dQw4w9WgXcQ';
</script>

<VideoEmbed.Root url={embedUrl} let:playing>
	{#snippet children({ playing })}
		<VideoEmbed.ProviderSelector />
		<!-- Or -->
		<VideoEmbed.Youtube />
		<!-- Or -->
		<VideoEmbed.Vimeo />
		{#if !playing}
			<VideoEmbed.PlayButton>
				<VideoEmbed.Thumbnail />
			</VideoEmbed.PlayButton>
		{/if}
	{/snippet}
</VideoEmbed.Root>
```

## Api

The video embed Api is available via `useVideoEmbed()` as well as the `Root` component children
props.

-   `playing` (`boolean`): `true` if the video embed is currently loaded and playing.
-   `play` (`() => void`): Play the video.
-   `requestPreconnect` (`() => void`): Request preconnection to the embed domains.
-   `preconnect` (`boolean`): `true` if preconnect has been requested
-   `url` (`string`): The URL of the video

## Components

### `Root`

Provides the context for the other components.

#### Props

-   `url` (`string`): The url of the video.

#### Children props

The video embed Api.

### `EmbedPlayButton.svelte`

A button that calls `requestPreconnect` when hovered and plays the video on click.

#### Props

-   `label` (`string`): The aria-label to use for the button. REQUIRED.

### `Thumbnail.svelte`

An img element that renders the default video thumbnail. Make sure to setup the
`vimeo-thumbnail.jpg` endpoint before using (documented below).

#### Props

-   `url` (`string`): The url of the video. Already provided if this component is used inside an a
    `Root` component.
-   `alt` (`string`): The alt text for the image.

### `ProviderSelector.svelte`

A selector component that automatically determines the provider and renders the appropriate embed.
For more control over how the markup is rendered, the component has a children prop that provides
the embed component.

#### Props

-   `url` (`string`): The url of the video. Already provided if this component is used inside a
    `Root` component.

#### Children props

-   `provider` (`'vimeo' | 'youtube'`): The embed provider, determined from the url.
-   `EmbedComponent` (`SvelteComponent`): The Svelte component of the embed.

### `Youtube.svelte`

The Youtube embed component. Automatically rendered by `ProviderSelector`.

### `Vimeo.svelte`

The Vimeo embed component. Automatically rendered by `ProviderSelector`.

## Example

```svelte
<script lang="ts">
	import type { AssetInterface } from 'src/craft';
	import { fade } from 'svelte/transition';
	import VideoEmbed from '@288-toolkit/video-embed';
	import PlayIcon from '$com/ui/PlayIcon.svelte';
	import Media from '$com/ui/Media.svelte';

	const {
		embedUrl,
		poster
	}: {
		embedUrl: Maybe<string>;
		poster: Maybe<AssetInterface>;
	} = $props();
</script>

<VideoEmbed.Root url={embedUrl} let:playing>
	<div class="grid-stack grid aspect-[2/1] w-full overflow-hidden rounded">
		<VideoEmbed.ProviderSelector class="size-full" />
		{#if !playing}
			<div class="size-full" out:fade={{ duration: 200 }}>
				<VideoEmbed.PlayButton>
					<div class="grid-stack grid size-full place-items-center">
						{#if poster}
							<Media media={poster} class="size-full object-cover" />
						{:else}
							<VideoEmbed.Thumbnail />
						{/if}
						<PlayIcon />
					</div>
				</VideoEmbed.PlayButton>
			</div>
		{/if}
	</div>
</VideoEmbed.Root>
```

## Functions

### `useVideoEmbed()`

Returns the video embed Api if used inside a `Root` component, otherwise returns `null`.

### `isYoutubeUrl()`

Check if a URL is a valid YouTube URL

### `getYoutubeId()`

Get the YouTube video ID from a URL

### `getYoutubeThumbnailUrl()`

Get the URL of a YouTube video thumbnail

### `isVimeoUrl()`

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
