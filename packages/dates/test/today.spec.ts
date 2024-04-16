import type { TimeZone } from '@288-toolkit/types/timezones';
import { describe, expect, test } from 'vitest';
import { computeTimezoneOffset, today } from '../src/today';

const timeZone = 'America/Toronto' as const;

const MAY_31ST_2023_UTC = '2023-05-31T00:00:00.000Z';
const MAY_31ST_2023_EDT = '2023-05-31T04:00:00.000Z';
const JUNE_1ST_2023_EDT = '2023-06-01T04:00:00.000Z';
const JUNE_1ST_2023_EDT_AT_6 = '2023-06-01T10:00:00.000Z';
const JUNE_1ST_2023_PDT = '2023-06-01T07:00:00.000Z';

const dateLike = (year: string, month: string, date: string, offset: string, hours = '12') => {
	return {
		// Compute proper time at date.
		// We can trust the date to be in UTC, so we can use UTC methods.
		getTime: () => new Date(`${year}-${month}-${date}T${hours}:00:00${offset}`).getTime(),
		// Output "local" date, since those can not be trusted to be in UTC.
		getFullYear: () => parseInt(year, 10),
		getMonth: () => parseInt(month, 10) - 1,
		getDate: () => parseInt(date, 10)
	};
};

describe('computeTimezoneOffset()', () => {
	test('should return proper hour offset', () => {
		const JAN_1ST_2023_ZULU = new Date('2023-01-01T00:00:00Z');
		const JUNE_1ST_2023_ZULU = new Date('2023-06-01T00:00:00Z');

		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'America/Vancouver')).toBe(-7);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'America/Toronto')).toBe(-4);
		expect(computeTimezoneOffset(JAN_1ST_2023_ZULU, 'America/Toronto')).toBe(-5);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'UTC')).toBe(0);
		expect(computeTimezoneOffset(JAN_1ST_2023_ZULU, 'UTC')).toBe(0);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'Europe/Istanbul')).toBe(3);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'Asia/Taipei')).toBe(8);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'Asia/Tokyo')).toBe(9);
		expect(computeTimezoneOffset(JUNE_1ST_2023_ZULU, 'Pacific/Funafuti')).toBe(12);
	});

	test('should return 0 on invalid input', () => {
		expect(computeTimezoneOffset(new Date(), '--Wrong--' as TimeZone)).toBe(0);
	});
});

describe('today()', () => {
	test('now should return today', () => {
		const now = new Date();
		const todayDate = today({ timeZone: 'America/Toronto' });
		expect(todayDate.getFullYear()).toBe(now.getFullYear());
		expect(todayDate.getMonth()).toBe(now.getMonth());
		expect(todayDate.getDate()).toBe(now.getDate());
	});

	test(`should return June 1st for ${timeZone}`, () => {
		expect(
			today({ now: dateLike('2023', '06', '01', '-0400', '00'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0400', '06'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0400', '12'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0400', '18'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0400', '23'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
	});

	test(`should return June 1st at 6:00 for ${timeZone}`, () => {
		expect(
			today({
				now: dateLike('2023', '06', '01', '-0400', '18'),
				hourOfStartOfDay: 6,
				timeZone
			}).toISOString()
		).toBe(JUNE_1ST_2023_EDT_AT_6);
	});

	test('should return June 1st for UTC', () => {
		expect(today({ now: dateLike('2023', '06', '01', '-0000'), timeZone }).toISOString()).toBe(
			JUNE_1ST_2023_EDT
		);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0000', '00'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '-0000', '23'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
	});

	test('should return June 1st for Japan', () => {
		expect(today({ now: dateLike('2023', '06', '01', '+0900'), timeZone }).toISOString()).toBe(
			JUNE_1ST_2023_EDT
		);
		expect(
			today({ now: dateLike('2023', '06', '01', '+0900', '00'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
		expect(
			today({ now: dateLike('2023', '06', '01', '+0900', '23'), timeZone }).toISOString()
		).toBe(JUNE_1ST_2023_EDT);
	});

	test('should return June 1st for PST', () => {
		const JUNE_1ST_2023 = dateLike('2023', '06', '01', '-0700');
		expect(today({ now: JUNE_1ST_2023, timeZone }).toISOString()).toBe(JUNE_1ST_2023_EDT);
	});

	test('should return May 31st for PST', () => {
		const MAY_31ST_2023 = dateLike('2023', '05', '31', '-0700');
		expect(today({ now: MAY_31ST_2023, timeZone }).toISOString()).toBe(MAY_31ST_2023_EDT);
	});

	test('should return May 31st for PST in UTC', () => {
		const MAY_31ST_2023 = dateLike('2023', '05', '31', '-0700');
		expect(today({ now: MAY_31ST_2023, timeZone: 'UTC' }).toISOString()).toBe(
			MAY_31ST_2023_UTC
		);
	});

	test('should return June 1st for Japan in Vancouver', () => {
		const JUNE_1ST_2023 = dateLike('2023', '06', '01', '+0900');
		expect(today({ now: JUNE_1ST_2023, timeZone: 'America/Vancouver' }).toISOString()).toBe(
			JUNE_1ST_2023_PDT
		);
	});
});
