import type { TimeZone } from '@288-toolkit/types/timezones';
import { describe, expect, test, vi } from 'vitest';
import { startOfDay } from '../src/startOfDay';

const at = (iso: string) => new Date(iso);

describe('startOfDay()', () => {
	test('should use the day of the date in the given timezone, not in the runtime timezone', () => {
		// August 9th 2025, 20:25 in Toronto
		const event = at('2025-08-10T00:25:00.000Z');
		expect(startOfDay(event, { timeZone: 'America/Toronto' }).toISOString()).toBe(
			'2025-08-09T04:00:00.000Z'
		);
	});

	test('should return the same day for every instant of that day', () => {
		const timeZone = 'America/Toronto';
		const expected = '2023-06-01T04:00:00.000Z';
		for (const iso of [
			'2023-06-01T04:00:00.000Z',
			'2023-06-01T10:00:00.000Z',
			'2023-06-01T23:59:59.999Z',
			'2023-06-02T03:59:59.999Z'
		]) {
			expect(startOfDay(at(iso), { timeZone }).toISOString()).toBe(expected);
		}
		expect(startOfDay(at('2023-06-01T03:59:59.999Z'), { timeZone }).toISOString()).toBe(
			'2023-05-31T04:00:00.000Z'
		);
	});

	test('should default to UTC', () => {
		expect(startOfDay(at('2023-06-01T23:59:59.000Z')).toISOString()).toBe(
			'2023-06-01T00:00:00.000Z'
		);
	});

	test('should handle timezones ahead of UTC', () => {
		// June 2nd 2023, 08:00 in Tokyo
		expect(
			startOfDay(at('2023-06-01T23:00:00.000Z'), { timeZone: 'Asia/Tokyo' }).toISOString()
		).toBe('2023-06-01T15:00:00.000Z');
	});

	test('should handle timezones offset by 30 and 45 minutes', () => {
		expect(
			startOfDay(at('2023-06-01T12:00:00.000Z'), { timeZone: 'Asia/Kolkata' }).toISOString()
		).toBe('2023-05-31T18:30:00.000Z');
		expect(
			startOfDay(at('2023-06-01T12:00:00.000Z'), { timeZone: 'Asia/Kathmandu' }).toISOString()
		).toBe('2023-05-31T18:15:00.000Z');
	});

	test('should use the offset at the start of the day on DST change days', () => {
		const timeZone = 'America/Toronto';
		// DST starts March 9th 2025 at 02:00 local: midnight is still EST (-5)
		expect(startOfDay(at('2025-03-09T20:00:00.000Z'), { timeZone }).toISOString()).toBe(
			'2025-03-09T05:00:00.000Z'
		);
		// The day after, at 21:00 local, the UTC date is already March 11th
		expect(startOfDay(at('2025-03-11T01:00:00.000Z'), { timeZone }).toISOString()).toBe(
			'2025-03-10T04:00:00.000Z'
		);
		// DST ends November 2nd 2025 at 02:00 local: midnight is still EDT (-4)
		expect(startOfDay(at('2025-11-02T20:00:00.000Z'), { timeZone }).toISOString()).toBe(
			'2025-11-02T04:00:00.000Z'
		);
		expect(startOfDay(at('2025-11-04T01:00:00.000Z'), { timeZone }).toISOString()).toBe(
			'2025-11-03T05:00:00.000Z'
		);
	});

	test('should return the first instant of the day when midnight does not exist', () => {
		// Santiago skipped from 00:00 to 01:00 on September 8th 2024
		expect(
			startOfDay(at('2024-09-08T15:00:00.000Z'), {
				timeZone: 'America/Santiago'
			}).toISOString()
		).toBe('2024-09-08T04:00:00.000Z');
	});

	test('should support hourOfStartOfDay', () => {
		expect(
			startOfDay(at('2023-06-01T18:00:00.000Z'), {
				timeZone: 'America/Toronto',
				hourOfStartOfDay: 6
			}).toISOString()
		).toBe('2023-06-01T10:00:00.000Z');
	});

	test('should not depend on the local fields of the date-like input', () => {
		const dateLike = {
			getTime: () => at('2025-08-10T00:25:00.000Z').getTime(),
			getFullYear: () => 2025,
			getMonth: () => 7,
			getDate: () => 10
		};
		expect(startOfDay(dateLike, { timeZone: 'America/Toronto' }).toISOString()).toBe(
			'2025-08-09T04:00:00.000Z'
		);
	});

	test('should return an invalid date for an invalid input', () => {
		expect(isNaN(startOfDay(new Date('nope'), { timeZone: 'America/Toronto' }).getTime())).toBe(
			true
		);
	});

	test('should fall back to UTC on an invalid timezone', () => {
		const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		expect(
			startOfDay(at('2023-06-01T12:00:00.000Z'), {
				timeZone: '--Wrong--' as TimeZone
			}).toISOString()
		).toBe('2023-06-01T00:00:00.000Z');
		expect(error).toHaveBeenCalled();
		error.mockRestore();
	});
});
