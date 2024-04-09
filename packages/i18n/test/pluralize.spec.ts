import { describe, expect, test } from 'vitest';
import { pluralize } from '../src/translations/pluralize';

const en = {
	cardinal: `
	|one: One related article
	|other: {count} related articles
	|4: Four related articles
	|2-4: A few related articles`,
	ordinal: `
	|one: st
	|two: nd
	|few: rd
	|other: th`,
	singleLine: '|one: 1 result |other: {count} results'
};

const fr = {
	cardinal: `
	|one: {count} article connexe
	|other: {count} articles connexes
	|4: Quatre articles connexes
	|2-4: Quelques articles connexes`,
	ordinal: `
	|one: er
	|two: ème
	|few: ème
	|other: ème`,
	singleLine: '|one: {count} resultat |other: {count} resultats'
};

describe('pluralize', () => {
	describe('cardinal', () => {
		test('Count 0', () => {
			expect(pluralize(en.cardinal, { count: 0 }, 'en-ca')).toBe('{count} related articles');
			expect(pluralize(fr.cardinal, { count: 0 }, 'fr-ca')).toBe('{count} article connexe');
		});
		test('count 1', () => {
			expect(pluralize(en.cardinal, { count: 1 }, 'en-ca')).toBe('One related article');
			expect(pluralize(fr.cardinal, { count: 1 }, 'fr-ca')).toBe('{count} article connexe');
		});
		test('Count 3, range', () => {
			expect(pluralize(en.cardinal, { count: 3 }, 'en-ca')).toBe('A few related articles');
			expect(pluralize(fr.cardinal, { count: 3 }, 'fr-ca')).toBe(
				'Quelques articles connexes'
			);
		});
		test('Count 4, specific count', () => {
			expect(pluralize(en.cardinal, { count: 4 }, 'en-ca')).toBe('Four related articles');
			expect(pluralize(fr.cardinal, { count: 4 }, 'fr-ca')).toBe('Quatre articles connexes');
		});
		test('Count 10', () => {
			expect(pluralize(en.cardinal, { count: 10 }, 'en-ca')).toBe('{count} related articles');
			expect(pluralize(fr.cardinal, { count: 10 }, 'fr-ca')).toBe(
				'{count} articles connexes'
			);
		});
		test('Count 100', () => {
			expect(pluralize(en.cardinal, { count: 100 }, 'en-ca')).toBe(
				'{count} related articles'
			);
			expect(pluralize(fr.cardinal, { count: 100 }, 'fr-ca')).toBe(
				'{count} articles connexes'
			);
		});
	});
	describe('ordinal', () => {
		test('Count 0', () => {
			expect(pluralize(en.ordinal, { count: 0, ordinal: true }, 'en-ca')).toBe('th');
			expect(pluralize(fr.ordinal, { count: 0, ordinal: true }, 'fr-ca')).toBe('ème');
		});
		test('Count 1', () => {
			expect(pluralize(en.ordinal, { count: 1, ordinal: true }, 'en-ca')).toBe('st');
			expect(pluralize(fr.ordinal, { count: 1, ordinal: true }, 'fr-ca')).toBe('er');
		});
		test('Count 2', () => {
			expect(pluralize(en.ordinal, { count: 2, ordinal: true }, 'en-ca')).toBe('nd');
			expect(pluralize(fr.ordinal, { count: 2, ordinal: true }, 'fr-ca')).toBe('ème');
		});
		test('Count 3', () => {
			expect(pluralize(en.ordinal, { count: 3, ordinal: true }, 'en-ca')).toBe('rd');
			expect(pluralize(fr.ordinal, { count: 3, ordinal: true }, 'fr-ca')).toBe('ème');
		});
		test('Count 4', () => {
			expect(pluralize(en.ordinal, { count: 4, ordinal: true }, 'en-ca')).toBe('th');
			expect(pluralize(fr.ordinal, { count: 4, ordinal: true }, 'fr-ca')).toBe('ème');
		});
		test('Count 10', () => {
			expect(pluralize(en.ordinal, { count: 10, ordinal: true }, 'en-ca')).toBe('th');
			expect(pluralize(fr.ordinal, { count: 10, ordinal: true }, 'fr-ca')).toBe('ème');
		});
		test('Count 100', () => {
			expect(pluralize(en.ordinal, { count: 100, ordinal: true }, 'en-ca')).toBe('th');
			expect(pluralize(fr.ordinal, { count: 100, ordinal: true }, 'fr-ca')).toBe('ème');
		});
	});
	describe('singleLine', () => {
		test('Count 0', () => {
			expect(pluralize(en.singleLine, { count: 0 }, 'en-ca')).toBe('{count} results');
			expect(pluralize(fr.singleLine, { count: 0 }, 'fr-ca')).toBe('{count} resultat');
		});
		test('Count 1', () => {
			expect(pluralize(en.singleLine, { count: 1 }, 'en-ca')).toBe('1 result');
			expect(pluralize(fr.singleLine, { count: 1 }, 'fr-ca')).toBe('{count} resultat');
		});
		test('Count 10', () => {
			expect(pluralize(en.singleLine, { count: 10 }, 'en-ca')).toBe('{count} results');
			expect(pluralize(fr.singleLine, { count: 10 }, 'fr-ca')).toBe('{count} resultats');
		});
	});
});
