import { render } from '@testing-library/svelte/svelte5';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SpriteAnimation from '../src/lib/SpriteAnimation.svelte';

beforeEach(() => {
	vi.useFakeTimers();

	const start = 0;
	let count = 0;
	let timeout: ReturnType<typeof setTimeout> | null = null;
	vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
		timeout = setTimeout(() => cb(100 * count++ + start), 1);
		return 1;
	});
	vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
	});
	vi.spyOn(window.performance, 'now').mockImplementation(() => {
		return start;
	});
});

afterEach(() => {
	vi.clearAllTimers();
});

test('Properly throws in dev with invalid url', () => {
	expect(() => {
		render(SpriteAnimation, {
			url: '',
			width: 1,
			height: 1
		});
	}).toThrowError('Cannot have a sprite with no url');
});

test('Properly throws in dev with invalid widht and height', () => {
	expect(() => {
		render(SpriteAnimation, {
			url: '/sprite.png',
			width: 0,
			height: 0
		});
	}).toThrowError('Cannot have a sprite with no width or no height');
});

test('Properly throws in dev with invalid rows and cols', () => {
	expect(() => {
		render(SpriteAnimation, {
			url: '/sprite.png',
			width: 1,
			height: 1,
			rows: 0,
			cols: 0
		});
	}).toThrowError('Cannot have a sprite with no cols or no rows');
});

test('Properly renders div with valid props', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();
	expect(div).toBeVisible();
	expect(div).toHaveAttribute('aria-hidden', 'true');
	expect(div).toHaveStyle({
		'--background-image': `url('test.png')`,
		'--padding-bottom': '200%',
		'--background-size': '100% 100%',
		'background-position': '0% 0%'
	});
});

test('Animates properly', async () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 33.333333333333336%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
});

test('Animates properly 2d', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		cols: 2,
		rows: 2
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '100% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '100% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
});

test('Animates properly at 50fps', async () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4,
		speed: 50
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
	vi.runOnlyPendingTimers();

	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});
});

test('Animates properly no loop', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4,
		loop: false
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 33.333333333333336%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});
});
