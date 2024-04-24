import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import { svelte } from '../../../shared/test/svelte';

const baseScript = `
<script lang="ts">
import { setContext } from 'svelte';
import { readable } from 'svelte/store';
import VimeoEmbed from '$lib/VimeoEmbed.svelte';

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
			<VimeoEmbed url="https://vimeo.com/TTTTT" title="Test" />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=false&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
	expect(iframe?.getAttribute('title')).toBe('Test');

	const links = document.head.querySelectorAll('link');
	expect(links.length).toBe(1);
	Array.from(links).forEach((link) => {
		expect(link).toBeInTheDocument();
	});
});

test('Properly renders with autoplay', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<VimeoEmbed url="https://vimeo.com/TTTTT" title="Test" autoplay />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=false&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
});

test('Properly renders with autoplay and mute', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<VimeoEmbed url="https://vimeo.com/TTTTT" title="Test" autoplay muted />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=true&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
});

test('Properly renders nothing when url is invalid', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<VimeoEmbed url="https://vimeo.com" title="Test" />
		`
	);

	const iframe = container.querySelector('iframe');
	expect(iframe).toBeNull();
});

test('Properly renders with custom options', async () => {
	const { container } = render(
		await svelte`
			${baseScript}
			<VimeoEmbed url="https://vimeo.com/TTTTT" title="Test" options="{{ byline: true }}" />
		`
	);
	const iframe = container.querySelector('div > iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=false&loop=false&byline=true'
	);
});
