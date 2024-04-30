# Slideshow

A slideshow component.

## `Slideshow.svelte`

The Slideshow component provides all of the logic to create your own slideshow. Simply put, it's a
controllable interval with `next` and `previous` functions to switch slides.

Note that this component renders no markup.

### Props

#### items

The items to loop over in the slideshow.

```ts
export let items: Array<T>;
```

#### slideDuration

The duration of each individual slide, in milliseconds.

```ts
export let slideDuration = 3500;
```

#### autoplay

Whether the slideshow should run on its own. If this is set to `false`, only clicking on a
`SlideshowButton` will allow moving from slide to slide.

```ts
export let autoplay = true;
```

#### loop

Whether the slideshow should go back to the first slide when doing `next` from the last slide; and,
conversely, whether the slideshow should go to the last slide when doing `previous` from the first
slide.

```ts
export let loop = true;
```

#### startDelay

The delay in milliseconds before the slideshow starts.

```ts
export let startDelay = 0;
```

### Slot props

-   readonly `item` (`T`): The item currently shown by the slideshow
-   readonly `index` (`number`): The index of the item currently shown by the slideshow

### Example

```svelte
<Slideshow items={[1, 2, 3, 4]} let:item let:index>
	{#key item}
		<div class="bg-[red]" transition:fade>Slide {item} {index}</div>
	{/key}
</Slideshow>
```

## `SlideshowButton.svelte`

The `SlideshowButton` component must be a child of Slideshow. It renders a button that will either
move the slideshow to the previous or the next slide.

Usually, this button will be used twice: once for `previous`, and once more for `next`.

### Props

### direction

### direction

The direction of the button.

```ts
export let direction: 'previous' | 'next';
```

### class

Classes to apply to the button.

### Example

```svelte
<SlideshowButton direction="next">Next</SlideshowButton>
```
