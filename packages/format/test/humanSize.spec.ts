import { expect, test } from 'vitest';
import { humanSize } from '../src/lib';

test('should return 0 bytes', () => {
	expect(humanSize(0).toString()).toBe('0.0 b');
	expect(humanSize(-1).toString()).toBe('0.0 b');
	expect(humanSize(-Infinity).toString()).toBe('0.0 b');
});

test('should return Infinity Pb', () => {
	expect(humanSize(Infinity).toString()).toBe('Infinity Pb');
});

test('should return 1 bytes', () => {
	expect(humanSize(1).toString()).toBe('1.0 b');
});

test('should support precision 0', () => {
	expect(humanSize(1).precision(0).toString()).toBe('1 b');
});

test('should support precision 2', () => {
	expect(humanSize(1).precision(2).toString()).toBe('1.00 b');
});

test('should return 1 kb', () => {
	expect(humanSize(Math.pow(2, 10)).toString()).toBe('1.0 kb');
});

test('should return 32.1 kb', () => {
	expect(humanSize(32900).toString()).toBe('32.1 kb');
});

test('should return 1 Mb', () => {
	expect(humanSize(Math.pow(2, 20)).toString()).toBe('1.0 Mb');
});

test('should return 1024 kb', () => {
	expect(humanSize(Math.pow(2, 20)).limit('kb').toString()).toBe('1024.0 kb');
});

test('should return 1 Gb', () => {
	expect(humanSize(Math.pow(2, 30)).toString()).toBe('1.0 Gb');
});

test('should return 1 Tb', () => {
	expect(humanSize(Math.pow(2, 40)).toString()).toBe('1.0 Tb');
});

test('should return 1 Pb', () => {
	expect(humanSize(Math.pow(2, 50)).toString()).toBe('1.0 Pb');
});

test('should return 1024 Tb', () => {
	expect(humanSize(Math.pow(2, 50)).limit('Tb').toString()).toBe('1024.0 Tb');
});

test('should return 1024.125 Tb', () => {
	expect(
		humanSize(Math.pow(2, 50) + Math.pow(2, 37))
			.limit('Tb')
			.precision(3)
			.toString()
	).toBe('1024.125 Tb');
});

test('the interface is pure (no side effect)', () => {
	const hs = humanSize(Math.pow(2, 50) + Math.pow(2, 37));
	expect(hs.limit('Tb').precision(3).toString()).toBe('1024.125 Tb');
	expect(
		hs
			.limit('Pb')
			// reuse precision
			.toString()
	).toBe('1.000 Pb');
	expect(
		hs
			// reuse limit
			.precision(6)
			.toString()
	).toBe('1.000122 Pb');
});
