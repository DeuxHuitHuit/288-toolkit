
import { expect, describe, test } from 'vitest';
import { getYoutubeId } from '../src/lib/youtube';

describe('getYoutubeId', () => {
	test('?v=1234', () => {
		const url = 'https://www.youtube.com/watch?v=1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('embed/1234', () => {
		const url = 'http://www.youtube.com/embed/1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('v/1234', () => {
		const url = 'https://youtube.com/v/1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('shorts/1234', () => {
		const url = 'https://www.youtube.com/shorts/1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('watch/1234', () => {
		const url = 'https://www.youtube.com/watch/1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('youtu.be/1234', () => {
		const url = 'https://youtu.be/1234';
		expect(getYoutubeId(url)).toBe('1234');
	});
	test('Invalid url', () => {
		const url = 'https//www.youtube.com/invalid/1234';
		expect(getYoutubeId(url)).toBe('');
	});
	test('No url', () => {
		expect(getYoutubeId('')).toBe('');
	});
});
