import { svelte } from '@288-toolkit/vite-plugin-svelte-inline-component';
import { render } from '@testing-library/svelte/svelte5';
import { expect, test } from 'vitest';

const baseScript = `
<script lang="ts">
import { setContext } from 'svelte';
import { readable } from 'svelte/store';
import YoutubeEmbed from '$lib/YoutubeEmbed.svelte';

setContext('__videoEmbed__', {
	playing: readable(true),
	preconnect: readable(true)
});
</script>

`;

test('Properly renders and preconnect', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed url="https://youtube.com/?v=TTTTT" />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=false&loop=false'
	);

	const links = document.head.querySelectorAll('link');
	expect(links.length).toBe(2);
	Array.from(links).forEach((link) => {
		expect(link).toBeInTheDocument();
	});
});

test('Properly renders with autoplay', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed url="https://youtube.com/?v=TTTTT" autoplay />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=false&loop=false'
	);
});

test('Properly renders with autoplay and mute', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed url="https://youtube.com/?v=TTTTT" autoplay muted />
		`
	);
	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
});

test('Properly renders nothing when url is invalid', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed url="https://youtube.com/?t=TTTTT" autoplay muted />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe).toBeNull();
});

test('Properly renders when url is .be', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed url="https://youtu.be/TTTTT" autoplay muted />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
});

test('Properly renders with custom options', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<YoutubeEmbed
				url="https://youtube.com/?v=TTTTT"
				autoplay
				muted
				options="{{ playsinline: true }}"
			/>
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false&playsinline=true'
	);
});
