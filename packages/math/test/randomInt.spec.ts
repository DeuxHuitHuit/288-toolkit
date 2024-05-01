import { describe, expect, test } from 'vitest';
import { randomInt } from '../src/randomInt';

describe('Boundaries', () => {
	test('It returns the min when min == max', () => {
		expect(randomInt(0, 0)).toBe(0);
		expect(randomInt(1.1, 1.2)).toBe(1);
		expect(randomInt(2.4, 2.9)).toBe(2);
		expect(randomInt(3, 3)).toBe(3);
		expect(randomInt(4, 4)).toBe(4);
		expect(randomInt(5, 5.00001)).toBe(5);
	});

	test('It swaps the min and max when min > max', () => {
		let r = randomInt(1, 0);
		expect(r).toBeGreaterThanOrEqual(0);
		expect(r).toBeLessThanOrEqual(1);
		r = randomInt(10, 7);
		expect(r).toBeGreaterThanOrEqual(7);
		expect(r).toBeLessThanOrEqual(10);
		r = randomInt(-10, -70);
		expect(r).toBeGreaterThanOrEqual(-70);
		expect(r).toBeLessThanOrEqual(-10);
	});

	test('It works with negative numbers', () => {
		let r = randomInt(-1, 0);
		expect(r).toBeGreaterThanOrEqual(-1);
		expect(r).toBeLessThanOrEqual(0);
		r = randomInt(-10, -1);
		expect(r).toBeGreaterThanOrEqual(-10);
		expect(r).toBeLessThanOrEqual(-1);
	});
});

describe('Distribution', () => {
	test('It returns a number between min and max', () => {
		for (let i = 0; i < 100; i++) {
			expect([1, 2, 3]).toContain(randomInt(1, 3));
		}
		for (let i = 0; i < 100; i++) {
			expect([2, 3, 4, 5, 6, 7, 8]).toContain(randomInt(2, 8));
		}
	});

	const testDistribution = (min: number, max: number) => {
		const iterations = 1_000_000;
		const distribution = new Array(max - min + 1).fill(0);
		for (let i = 0; i < iterations * distribution.length; i++) {
			distribution[randomInt(min, max) - min]++;
		}
		expect(distribution).toHaveLength(max - min + 1);
		for (let i = 0; i < distribution.length; i++) {
			// Accept a 1% margin of error
			expect(distribution[i]).toBeGreaterThan(iterations * 0.99);
			expect(distribution[i]).toBeLessThan(iterations * 1.01);
		}
	};

	test('It distributes evenly - (1 to 6)', () => testDistribution(1, 6));
	test('It distributes evenly - (20 to 40)', () => testDistribution(20, 40));
});
