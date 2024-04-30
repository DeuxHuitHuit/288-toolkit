<script lang="ts">
	import { debounce } from '@288-toolkit/timeout';

	/**
	 * The direction of the marquee.
	 */
	export let direction: 'natural' | 'inverted' = 'natural';
	/**
	 * The orientation of the marquee. Default: `horizontal`.
	 */
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';
	/**
	 * Wether the marquee should pause when hovered. Default: `false`.
	 */
	export let stopOnHover = false;

	const minCopies = 2;

	let copies = minCopies;

	const setCopies = (el: HTMLElement) => {
		const observer = new ResizeObserver(
			debounce(() => {
				const containerHeight = el.clientHeight;
				const containerWidth = el.clientWidth;
				const containerLength =
					orientation === 'horizontal' ? containerWidth : containerHeight;
				const child = el.firstElementChild;
				if (child) {
					const childHeight = child.clientHeight;
					const childWidth = child.clientWidth;
					const childLength = orientation === 'horizontal' ? childWidth : childHeight;
					const totalLength = containerLength * 2;
					const newCopiesQty = Math.ceil(totalLength / childLength) || minCopies;
					copies = Math.max(newCopiesQty, minCopies);
				}
			}, 100)
		);
		observer.observe(document.body);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	};
</script>

<div
	class="_marquee-ctn {direction}"
	class:_stop-on-hover={stopOnHover}
	data-orientation={orientation}
	use:setCopies
>
	{#key copies}
		{#each new Array(copies) as _, i}
			{@const copy = i > 0}
			<div class="_marquee" aria-hidden={copy || null}>
				<slot {copy} />
			</div>
		{/each}
	{/key}
</div>

<style>
	._marquee-ctn {
		--default-speed: 12000ms;
		display: flex;
		overflow: hidden;
		gap: var(--gap, 0);
	}

	._marquee-ctn[data-orientation='vertical'] {
		height: 100%;
		flex-direction: column;

		._marquee {
			animation: marqueeVertical var(--speed, var(--default-speed)) linear infinite both;
		}
	}

	._marquee-ctn[data-orientation='horizontal'] {
		width: 100%;
	}

	._marquee {
		flex-shrink: 0;
		animation: marquee var(--speed, var(--default-speed)) linear infinite both;
	}

	._marquee-ctn.inverted ._marquee {
		animation-direction: reverse;
	}

	._marquee-ctn:focus-within ._marquee,
	._marquee-ctn._stop-on-hover:hover ._marquee,
	._marquee-ctn._stop-on-hover:active ._marquee {
		animation-play-state: paused;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marqueeVertical {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}
</style>
