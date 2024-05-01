<script context="module">import { estimatedAvailableMegaBytesPerSeconds } from './estimatedAvailableMegaBytesPerSeconds.js';
import { BROWSER, DEV } from 'esm-env';
const isNetworkGoodEnough = estimatedAvailableMegaBytesPerSeconds >= 1;
if (BROWSER && DEV) {
    // eslint-disable-next-line no-console
    console.info(`Bandwidth is ${estimatedAvailableMegaBytesPerSeconds.toFixed(3)} Mb/s, network is ${isNetworkGoodEnough ? 'GOOD' : 'BAD'}`);
}
</script>

<script>import { inView } from 'motion';
/**
 * The url of the sprite.
 */
export let url;
/**
 * The width in px of a single frame in the sprite.
 */
export let width;
/**
 * The height in px of a single frame in the sprite.
 */
export let height;
/**
 * The speed in ms of the animation.
 */
export let speed = 100;
/**
 * The number of columns in the sprite.
 */
export let cols = 1;
/**
 * The number of rows in the sprite.
 */
export let rows = 1;
/**
 * Wether the animation should loop.
 */
export let loop = true;
/**
 * The still image to show when the animation is not running.
 */
export let still = null;
const count = cols * rows;
const paddingRatio = (height / width) * 100;
let running = !still;
let animation;
const createBackgroundPosition = (x, y) => {
    return x + '% ' + y + '%';
};
const createAnimation = (node) => {
    let start;
    let raf;
    const current = {
        col: 0,
        row: 0,
        last: -1
    };
    const size = {
        col: cols < 2 ? 0 : 100 / (cols - 1),
        row: rows < 2 ? 0 : 100 / (rows - 1)
    };
    const newRaf = () => {
        raf = requestAnimationFrame(runLoop);
    };
    const updateBgPosition = () => {
        node.style.backgroundPosition = createBackgroundPosition(size.col * current.col, size.row * current.row);
    };
    const runLoop = (time) => {
        const diff = Math.max(0, time - start);
        const framesElapsed = ~~(diff / speed);
        const index = framesElapsed % count;
        if (current.last === index) {
            return newRaf();
        }
        current.last = index;
        current.row = ~~(index / cols);
        current.col = index % cols;
        updateBgPosition();
        if (loop || framesElapsed + 1 < count) {
            newRaf();
        }
    };
    return {
        start() {
            if (cols < 1 || rows < 1) {
                throw new Error('Cannot have a sprite with no cols or no rows');
            }
            start = window.performance.now();
            running = true;
            updateBgPosition();
            newRaf();
        },
        end() {
            cancelAnimationFrame(raf);
        }
    };
};
const setup = (node) => {
    animation = createAnimation(node);
    if (!still) {
        animation.start();
    }
    return {
        destroy() {
            animation.end();
        }
    };
};
const loadInView = (node) => {
    const destroy = inView(node, ({ isIntersecting }) => {
        if (!still) {
            return;
        }
        if (!isIntersecting) {
            return;
        }
        if (!isNetworkGoodEnough) {
            return;
        }
        let image = document.createElement('img');
        const loaded = () => {
            animation.start();
            image = null;
        };
        image.onload = loaded;
        image.src = url;
        if (image.complete) {
            loaded();
        }
    });
    return {
        destroy
    };
};
$: renderedUrl = running || !still ? url : still;
$: if (DEV) {
    if (!url) {
        throw new Error('Cannot have a sprite with no url');
    }
    if (cols < 1 || rows < 1) {
        throw new Error('Cannot have a sprite with no cols or no rows');
    }
    if (width < 1 || height < 1) {
        throw new Error('Cannot have a sprite with no width or no height');
    }
}
</script>

{#if url && width && height && count}
	<div
		use:setup
		use:loadInView
		class="_sprite-animation"
		aria-hidden="true"
		style="
			--background-image: url('{renderedUrl}');
			--background-size: {cols * 100}% {rows * 100}%;
			--padding-bottom: {paddingRatio}%;
		"
	/>
{/if}

<style>
	:global(._sprite-animation) {
		width: 100%;
		height: 0;
		padding-bottom: var(--padding-bottom, 100%);
		display: block;
		background-repeat: no-repeat;
		background-size: var(--background-size, 100% auto);
		background-image: var(--background-image);
		background-clip: border-box;
		overflow: hidden;
		transform: translateZ(0);
	}
</style>
