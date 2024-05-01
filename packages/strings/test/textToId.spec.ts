import { expect, test } from 'vitest';
import { textToId } from '../src/textToId';

test('should convert regular text to an id friendly string', () => {
	const text = 'This is some regular text';
	const textId = textToId(text);
	expect(textId).toBe('this-is-some-regular-text');
});

test('should remove special characters', () => {
	const specialCharachters = '>This is * a title</~ 	"';
	const specialCharachtersId = textToId(specialCharachters);
	expect(specialCharachtersId).toBe('this-is-a-title');
});

test('should preserve accents', () => {
	const textWithAccents = 'Écrire en français';
	const textWithAccentsId = textToId(textWithAccents);
	expect(textWithAccentsId).toBe('écrire-en-français');
});

test('should preserve dashes in regular text', () => {
	const text = 'Test - test';
	const id = textToId(text);
	expect(id).toBe('test-test');
});

test('should remove dashes surrounding the text', () => {
	const leftDash = '-test';
	const rightDast = 'test-';
	const surroundingDahses = '-test-';
	expect(textToId(leftDash)).toBe('test');
	expect(textToId(rightDast)).toBe('test');
	expect(textToId(surroundingDahses)).toBe('test');
});

test('should return an empty string if the input is an empty string', () => {
	expect(textToId('')).toBe('');
});

test('should return an empty string if the input only contains spaces', () => {
	expect(textToId('        ')).toBe('');
});

test('should return an empty string if the input is --', () => {
	expect(textToId('--')).toBe('');
});

test('should not begin with a number', () => {
	expect(textToId('1test')).toBe('_1test');
});
