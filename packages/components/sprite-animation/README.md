# Sprite-animation

```sh
npm i @288-toolkit/sprite-animation
```

The SpriteAnimation component allows to create looping anim based off png sprites.

## Implementation

A div with fluid width and height that displays a background image. The background position is
determined based on the time since the last `start()` call. It's a port of
<https://github.com/DeuxHuitHuit/jQuery-sprite-animation/blob/master/src/jquery.sprite-animation.js>

The animation starts as soon as the element is in the viewport.

It will also check the estimated available megabytes per seconds of bandwidth available. If it is
less than one, it won't start the animation.

## Props

-   `url` - `string`: The URL of the sprite.
-   `width` - `number`: The width in pixels of a single frame in the sprite.
-   `height` - `number`: The height in pixels of a single frame in the sprite.
-   `speed` - `number`: The speed in milliseconds of the animation. Default: 100ms.
-   `cols` - `number`: The number of columns in the sprite.
-   `rows` - `number`: The number of rows in the sprite.
-   `loop` - `boolean`: Whether the animation should loop.
-   `still` - `string`: The still image to show when the animation is not running.

## Example

```svelte
<div>
	<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
</div>
<div>
	<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
</div>
<div>
	<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
</div>
```
