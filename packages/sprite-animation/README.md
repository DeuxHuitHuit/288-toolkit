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

### url

The URL of the sprite.

```ts
export let url: string;
```

### width

The width in pixels of a single frame in the sprite.

```ts
export let width: number;
```

### height

The height in pixels of a single frame in the sprite.

```ts
export let height: number;
```

### speed

The speed in milliseconds of the animation. Default: 100ms.

```ts
export let speed = 100;
```

### cols

The number of columns in the sprite.

```ts
export let cols = 1;
```

### rows

The number of rows in the sprite.

```ts
export let rows = 1;
```

### loop

Whether the animation should loop.

```ts
export let loop = true;
```

### still

The still image to show when the animation is not running.

```ts
export let still: Maybe<string> = null;
```

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
