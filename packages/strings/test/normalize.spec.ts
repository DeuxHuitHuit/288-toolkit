import { expect, test } from 'vitest';
import { normalize } from '../src/normalize';

test('should normalize a string', () => {
	const text = 'This is some regular text';
	const normalizedText = normalize(text);
	expect(normalizedText).toBe(text);
});

test('should replace accents with their base characters', () => {
	const text = 'écrire en français';
	const normalizedText = normalize(text);
	expect(normalizedText).toBe('ecrire en francais');
});

test('should replace special characters with their base characters case sensitive', () => {
	const text = 'Écrire en Français!';
	const normalizedText = normalize(text);
	expect(normalizedText).toBe('Ecrire en Francais!');
});
