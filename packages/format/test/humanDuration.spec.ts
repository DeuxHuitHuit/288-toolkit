import { describe, expect, test } from 'vitest';
import { humanDuration, humanSeconds } from '../src';

describe('seconds', () => {
	test('should return less than 1 second', () => {
		expect(humanDuration(0).toString()).toBe('lessThan 1 units.long.second');
		expect(humanDuration(-1).toString()).toBe('lessThan 1 units.long.second');
		expect(humanDuration(-Infinity).toString()).toBe('lessThan 1 units.long.second');
	});

	test('should return 1 second', () => {
		expect(humanDuration(1 / 60).toString()).toBe('1 units.long.second');
	});

	test('should return seconds', () => {
		expect(humanDuration(2 / 60).toString()).toBe('2 units.long.seconds');
		expect(humanDuration(3 / 60).toString()).toBe('3 units.long.seconds');
		expect(humanDuration(0.5).toString()).toBe('30 units.long.seconds');
		expect(humanDuration(57 / 60).toString()).toBe('57 units.long.seconds');
	});
});

describe('minutes', () => {
	test('should return 1 minute', () => {
		expect(humanDuration(58 / 60).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1.1).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1.49).toString()).toBe('1 units.long.minute');
	});

	test('should return 2 minutes', () => {
		expect(humanDuration(1.5).toString()).toBe('2 units.long.minutes');
		expect(humanDuration(2).toString()).toBe('2 units.long.minutes');
		expect(humanDuration(2.1).toString()).toBe('2 units.long.minutes');
	});

	test('should return minutes', () => {
		expect(humanDuration(10).toString()).toBe('10 units.long.minutes');
		expect(humanDuration(20).toString()).toBe('20 units.long.minutes');
		expect(humanDuration(31).toString()).toBe('31 units.long.minutes');
		expect(humanDuration(59).toString()).toBe('59 units.long.minutes');
		expect(humanDuration(60).toString()).toBe('60 units.long.minutes');
		expect(humanDuration(61).toString()).toBe('61 units.long.minutes');
		expect(humanDuration(90).toString()).toBe('90 units.long.minutes');
		expect(humanDuration(1_000_000).toString()).toBe('1000000 units.long.minutes');
	});

	test('should return round minutes', () => {
		expect(humanDuration(10.1).toString()).toBe('10 units.long.minutes');
		expect(humanDuration(20.4).toString()).toBe('20 units.long.minutes');
		expect(humanDuration(30.5).toString()).toBe('31 units.long.minutes');
		expect(humanDuration(99.9).toString()).toBe('100 units.long.minutes');
	});
});

describe('display options', () => {
	test('should use short units', () => {
		expect(humanDuration(0).useShortUnits().toString()).toBe('lessThan 1 units.short.second');
		expect(
			humanDuration(1 / 60)
				.useShortUnits()
				.toString()
		).toBe('1 units.short.second');
		expect(humanDuration(0.5).useShortUnits().toString()).toBe('30 units.short.seconds');
		expect(humanDuration(1).useShortUnits().toString()).toBe('1 units.short.minute');
		expect(humanDuration(10).useShortUnits().toString()).toBe('10 units.short.minutes');
		expect(humanDuration(100).useShortUnits().toString()).toBe('100 units.short.minutes');
	});

	test('should use hours', () => {
		expect(humanDuration(0).useHours().toString()).toBe('lessThan 1 units.long.second');
		expect(
			humanDuration(1 / 60)
				.useHours()
				.toString()
		).toBe('1 units.long.second');
		expect(humanDuration(0.5).useHours().toString()).toBe('30 units.long.seconds');
		expect(humanDuration(1).useHours().toString()).toBe('1 units.long.minute');
		expect(humanDuration(10).useHours().toString()).toBe('10 units.long.minutes');
		expect(humanDuration(59).useHours().toString()).toBe('59 units.long.minutes');
		expect(humanDuration(60).useHours().toString()).toBe('1 units.long.hour');
		expect(humanDuration(61).useHours().toString()).toBe(
			'1 units.long.hour 1 units.long.minute'
		);
		expect(humanDuration(100).useHours().toString()).toBe(
			'1 units.long.hour 40 units.long.minutes'
		);
		expect(humanDuration(300).useHours().toString()).toBe('5 units.long.hours');
		expect(humanDuration(302).useHours().toString()).toBe(
			'5 units.long.hours 2 units.long.minutes'
		);
	});

	test('should cap to 1 min', () => {
		expect(humanDuration(0).minutesLimit(1).toString()).toBe('lessThan 1 units.long.minute');
		expect(humanDuration(0.1).minutesLimit(1).toString()).toBe('lessThan 1 units.long.minute');
		expect(
			humanDuration(57 / 60)
				.minutesLimit(1)
				.toString()
		).toBe('lessThan 1 units.long.minute');
		expect(
			humanDuration(58 / 60)
				.minutesLimit(1)
				.toString()
		).toBe('lessThan 1 units.long.minute');
		expect(humanDuration(1).minutesLimit(1).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1.1).minutesLimit(1).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1.49).minutesLimit(1).toString()).toBe('1 units.long.minute');
		expect(humanDuration(1.9).minutesLimit(1).toString()).toBe('2 units.long.minutes');
		expect(humanDuration(60).useHours().minutesLimit(1).toString()).toBe('1 units.long.hour');
		expect(humanDuration(61).useHours().minutesLimit(1).toString()).toBe(
			'1 units.long.hour 1 units.long.minute'
		);
		expect(humanDuration(100).useHours().minutesLimit(1).toString()).toBe(
			'1 units.long.hour 40 units.long.minutes'
		);
		expect(humanDuration(300).useHours().minutesLimit(1).toString()).toBe('5 units.long.hours');
		expect(humanDuration(302).useHours().minutesLimit(1).toString()).toBe(
			'5 units.long.hours 2 units.long.minutes'
		);
	});

	test('should cap to 2 min', () => {
		expect(humanDuration(0).minutesLimit(2).toString()).toBe('lessThan 2 units.long.minutes');
		expect(humanDuration(0.1).minutesLimit(2).toString()).toBe('lessThan 2 units.long.minutes');
		expect(
			humanDuration(57 / 60)
				.minutesLimit(2)
				.toString()
		).toBe('lessThan 2 units.long.minutes');
		expect(
			humanDuration(58 / 60)
				.minutesLimit(2)
				.toString()
		).toBe('lessThan 2 units.long.minutes');
		expect(humanDuration(1).minutesLimit(2).toString()).toBe('lessThan 2 units.long.minutes');
		expect(humanDuration(1.1).minutesLimit(2).toString()).toBe('lessThan 2 units.long.minutes');
		expect(humanDuration(1.49).minutesLimit(2).toString()).toBe(
			'lessThan 2 units.long.minutes'
		);
		expect(humanDuration(1.9).minutesLimit(2).toString()).toBe('lessThan 2 units.long.minutes');
		expect(humanDuration(2).minutesLimit(2).toString()).toBe('2 units.long.minutes');
		expect(humanDuration(60).useHours().minutesLimit(2).toString()).toBe('1 units.long.hour');
		expect(humanDuration(61).useHours().minutesLimit(2).toString()).toBe('1 units.long.hour');
		expect(humanDuration(62).useHours().minutesLimit(2).toString()).toBe(
			'1 units.long.hour 2 units.long.minutes'
		);
		expect(humanDuration(100).useHours().minutesLimit(2).toString()).toBe(
			'1 units.long.hour 40 units.long.minutes'
		);
		expect(humanDuration(300).useHours().minutesLimit(2).toString()).toBe('5 units.long.hours');
		expect(humanDuration(301).useHours().minutesLimit(2).toString()).toBe('5 units.long.hours');
		expect(humanDuration(302).useHours().minutesLimit(2).toString()).toBe(
			'5 units.long.hours 2 units.long.minutes'
		);
	});

	test('should cap to 5 min', () => {
		expect(humanDuration(0).minutesLimit(5).toString()).toBe('lessThan 5 units.long.minutes');
		expect(humanDuration(0.1).minutesLimit(5).toString()).toBe('lessThan 5 units.long.minutes');
		expect(
			humanDuration(57 / 60)
				.minutesLimit(5)
				.toString()
		).toBe('lessThan 5 units.long.minutes');
		expect(
			humanDuration(58 / 60)
				.minutesLimit(5)
				.toString()
		).toBe('lessThan 5 units.long.minutes');
		expect(humanDuration(1).minutesLimit(5).toString()).toBe('lessThan 5 units.long.minutes');
		expect(humanDuration(1.1).minutesLimit(5).toString()).toBe('lessThan 5 units.long.minutes');
		expect(humanDuration(1.49).minutesLimit(5).toString()).toBe(
			'lessThan 5 units.long.minutes'
		);
		expect(humanDuration(2.9).minutesLimit(5).toString()).toBe('lessThan 5 units.long.minutes');
		expect(humanDuration(5).minutesLimit(5).toString()).toBe('5 units.long.minutes');
		expect(humanDuration(60).useHours().minutesLimit(5).toString()).toBe('1 units.long.hour');
		expect(humanDuration(61).useHours().minutesLimit(5).toString()).toBe('1 units.long.hour');
		expect(humanDuration(64).useHours().minutesLimit(5).toString()).toBe('1 units.long.hour');
		expect(humanDuration(65).useHours().minutesLimit(5).toString()).toBe(
			'1 units.long.hour 5 units.long.minutes'
		);
		expect(humanDuration(100).useHours().minutesLimit(5).toString()).toBe(
			'1 units.long.hour 40 units.long.minutes'
		);
		expect(humanDuration(300).useHours().minutesLimit(5).toString()).toBe('5 units.long.hours');
		expect(humanDuration(304).useHours().minutesLimit(5).toString()).toBe('5 units.long.hours');
		expect(humanDuration(305).useHours().minutesLimit(5).toString()).toBe(
			'5 units.long.hours 5 units.long.minutes'
		);
	});

	test('should use join value', () => {
		expect(humanDuration(61).useHours().join('+').toString()).toBe(
			'1 units.long.hour+1 units.long.minute'
		);
	});

	test('should use join translation key', () => {
		expect(humanDuration(61).useHours().joinWith('and').toString()).toBe(
			'1 units.long.hourjoins.and1 units.long.minute'
		);
		expect(humanDuration(61).useHours().and().toString()).toBe(
			'1 units.long.hourjoins.and1 units.long.minute'
		);
	});

	test('should use precision', () => {
		expect(humanDuration(0).minutesPrecision(1).toString()).toBe(
			'lessThan 1 units.long.second'
		);
		expect(
			humanDuration(1 / 60)
				.minutesPrecision(1)
				.toString()
		).toBe('1 units.long.second');
		expect(
			humanDuration(1.5 / 60)
				.minutesPrecision(1)
				.toString()
		).toBe('1 units.long.second');
		expect(
			humanDuration(2 / 60)
				.minutesPrecision(1)
				.toString()
		).toBe('2 units.long.seconds');
		expect(humanDuration(0.5).minutesPrecision(1).toString()).toBe('30 units.long.seconds');
		expect(humanDuration(1).minutesPrecision(1).toString()).toBe('1.0 units.long.minute');
		expect(humanDuration(1.5).minutesPrecision(1).toString()).toBe('1.5 units.long.minutes');
		expect(humanDuration(61).minutesPrecision(1).toString()).toBe('61.0 units.long.minutes');
		expect(humanDuration(61.087).minutesPrecision(3).toString()).toBe(
			'61.087 units.long.minutes'
		);
		expect(humanDuration(61).useHours().minutesPrecision(1).toString()).toBe(
			'1 units.long.hour 1.0 units.long.minute'
		);
		expect(humanDuration(100.7).useHours().minutesPrecision(1).toString()).toBe(
			'1 units.long.hour 40.7 units.long.minutes'
		);
		expect(humanDuration(300.7).useHours().minutesPrecision(1).toString()).toBe(
			'5 units.long.hours 0.7 units.long.minute'
		);
		expect(humanDuration(302.09).useHours().minutesPrecision(1).toString()).toBe(
			'5 units.long.hours 2.1 units.long.minutes'
		);
		expect(humanDuration(302.09).useHours().minutesPrecision(2).toString()).toBe(
			'5 units.long.hours 2.09 units.long.minutes'
		);
	});
});

describe('humanSeconds()', () => {
	test('should return less than 1 second', () => {
		expect(humanSeconds(1).toString()).toBe('1 units.long.second');
	});
	test('should return 1 second', () => {
		expect(humanSeconds(1).toString()).toBe('1 units.long.second');
	});
	test('should return 1 minute', () => {
		expect(humanSeconds(60).useShortUnits().toString()).toBe('1 units.short.minute');
	});
});
