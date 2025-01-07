import { describe, expect, test } from 'vitest';
import { parseDateTime } from '../src/parseDateTime';

describe('parseDateTime()', () => {
	test('should return null if the string is empty', () => {
		expect(parseDateTime('')).toBeNull();
	});

	test('should return the same date if the input is a Date object', () => {
		const date = new Date();
		expect(parseDateTime(date)).toEqual(date);
	});

	test('should return a new Date object with the same time if the input is a string', () => {
		const date = new Date('2023-01-01T00:00:00Z');
		expect(parseDateTime('2023-01-01T00:00:00Z')).toEqual(date);
	});

	test('should return a new Date object with the same localized time if the input is a string', () => {
		const date = new Date('2023-01-01T00:00:00-0200');
		expect(parseDateTime('2023-01-01T00:00:00-0200')).toEqual(date);
	});

	test('should return null if the string is not a valid date', () => {
		expect(parseDateTime('sasasa')).toBeNull();
		expect(parseDateTime(null as unknown as string)).toBeNull();
	});

	test('should return null if the date is not a valid date', () => {
		expect(parseDateTime(new Date('sasasa'))).toBeNull();
	});
});
