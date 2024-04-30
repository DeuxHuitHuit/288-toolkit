import { describe, expect, test } from 'vitest';
import { createFormatDate, formatDate } from '../src/lib';

describe('formatDate()', () => {
	test('It formats in America/Toronto in fr-ca', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), {
				timeZone: 'America/Toronto',
				locale: 'fr-ca'
			})
		).toBe('2020-12-31');
		expect(
			formatDate(new Date('2021-12-31T05:00:00Z'), {
				timeZone: 'America/Toronto',
				locale: 'fr-ca'
			})
		).toBe('2021-12-31');
	});

	test('It formats in America/Toronto in en-us', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), {
				timeZone: 'America/Toronto',
				locale: 'en-us'
			})
		).toBe('12/31/2020');
		expect(
			formatDate(new Date('2021-12-31T05:00:00Z'), {
				timeZone: 'America/Toronto',
				locale: 'en-us'
			})
		).toBe('12/31/2021');
	});

	test('It formats in Japan in fr-ca', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'fr-ca'
			})
		).toBe('2021-01-01');
		expect(
			formatDate(new Date('2021-12-31T18:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'fr-ca'
			})
		).toBe('2022-01-01');
	});

	test('It formats in Japan in en-us', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'en-us'
			})
		).toBe('1/1/2021');
		expect(
			formatDate(new Date('2021-12-31T18:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'en-us'
			})
		).toBe('1/1/2022');
	});

	test('It formats in Japan in en-ca', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'en-ca'
			})
		).toBe(
			// TODO: RemovedEdge case for node 18 vs. node 20
			process.version.startsWith('v18') ? '1/1/2021' : '2021-01-01'
		);
		expect(
			formatDate(new Date('2021-12-31T18:00:00Z'), {
				timeZone: 'Asia/Tokyo',
				locale: 'en-ca'
			})
		).toBe(
			// TODO: RemovedEdge case for node 18 vs. node 20
			process.version.startsWith('v18') ? '1/1/2022' : '2022-01-01'
		);
	});
});

describe('createFormatDate()', () => {
	test('It formats in America/Toronto', () => {
		expect(
			createFormatDate({ timeZone: 'America/Toronto', locale: 'en-us' }).format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe('12/31/2020');
		// TODO: RemovedEdge case for node 18 vs. node 20
		expect(
			createFormatDate({ timeZone: 'America/Toronto', locale: 'en-ca' }).format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe(process.version.startsWith('v18') ? '12/31/2020' : '2020-12-31');
		expect(
			createFormatDate({ timeZone: 'America/Toronto', locale: 'fr-ca' }).format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe('2020-12-31');
		expect(
			createFormatDate({
				timeZone: 'America/Toronto',
				dateStyle: 'short',
				locale: 'fr-ca'
			}).format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2020-12-31');
	});

	test('It sets the proper options for America/Toronto', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.long()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('December 31, 2020');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.long()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31 décembre 2020');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.medium()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('Dec 31, 2020');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.medium()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31 déc. 2020');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.short()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('12/31/20');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.full()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('Thursday, December 31, 2020');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.full()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('jeudi 31 décembre 2020');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.day()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.day('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.day('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.day()
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate({ ...options, locale: 'en-ca' })
				.day()
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.month()
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.month()
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.month('long')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('January');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.month('long')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('janvier');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.month('short')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('janv.');
		expect(
			createFormatDate({ ...options, locale: 'en-ca' })
				.month('2-digit')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.month('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.year()
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('2021');
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.year('2-digit')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('21');
	});

	test('It overrides previous options', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.long()
				.timeZone('Asia/Tokyo')
				.short()
				.locale('fr-ca')
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2021-01-01');
	});

	test('It combines previous options', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.year('2-digit')
				.month('2-digit')
				.day('2-digit')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('01/01/21');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.year('numeric')
				.month('numeric')
				.day('2-digit')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('1/01/2021');
		expect(
			createFormatDate({ ...options, locale: 'en-us' })
				.year('2-digit')
				.day('numeric')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('1 21'); // no month
		expect(
			createFormatDate({ ...options, locale: 'fr-ca' })
				.year('2-digit')
				.day('numeric')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('21 1'); // no month
	});

	test('It forces a "ISO" locale', () => {
		expect(
			createFormatDate({
				timeZone: 'America/Toronto',
				dateStyle: 'short',
				locale: 'en-ca'
			})
				.iso()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2020-12-31');

		expect(
			createFormatDate({
				timeZone: 'UTC',
				timeStyle: 'medium',
				locale: 'en-ca'
			})
				.iso()
				.format(new Date('2021-01-01T01:02:03Z'))
		).toBe('01:02:03');
	});
});
