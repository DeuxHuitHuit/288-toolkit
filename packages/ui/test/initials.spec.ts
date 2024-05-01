import { describe, expect, test } from 'vitest';
import { fontSizeFromInitials, formatInitials, initials } from '../src/lib/initials';

describe('initials()', () => {
	test('should return empty string', () => {
		// @ts-expect-error testing with null
		expect(initials(null)).toBe('');
		expect(initials('')).toBe('');
		expect(initials('  ')).toBe('');
	});

	test('should return AC', () => {
		expect(initials('A C')).toBe('AC');
		expect(initials('A-C')).toBe('AC');
		expect(initials("A-'C")).toBe('AC');
		expect(initials('Alex Claude')).toBe('AC');
		expect(initials('    Alex     Claude  ')).toBe('AC');
	});

	test('should return DHH', () => {
		expect(initials(' Deux Huit Huit ')).toBe('DHH');
		expect(initials('D H H')).toBe('DHH');
		expect(initials(' Deux-Huit-Huit ')).toBe('DHH');
		expect(initials(' Deux""Huit()Huit ')).toBe('DHH');
		expect(initials(' Deux-Huit-Huit  extra', 3)).toBe('DHH');
		expect(initials(' Deux-(Huit-Huit ')).toBe('DHH');
		expect(initials(' Deux-)Huit-Huit ')).toBe('DHH');
		expect(initials(' Deux - , "Huit  Huit ')).toBe('DHH');
	});

	test('should return DH', () => {
		expect(initials(' Deux (Huit) Huit ')).toBe('DH');
		expect(initials('D " H " H')).toBe('DH');
		expect(initials(' Deux---(Huit)---Huit ')).toBe('DH');
		expect(initials(' Deux-[Huit Huit]-Huit  extra', 2)).toBe('DH');
		expect(initials(' Deux-(Huit[-)Huit ')).toBe('DH');
		expect(initials(' Deux  "Huit"  Huit ')).toBe('DH');
	});
});

describe('fontSizeFromInitials()', () => {
	test('should return the proper font size', () => {
		expect(fontSizeFromInitials('A', ['1rem', '2rem'])).toBe('2rem');
		expect(fontSizeFromInitials('AC', ['1rem', '2rem'])).toBe('2rem');
		expect(fontSizeFromInitials('ACB', ['1rem', '2rem'])).toBe('2rem');
	});
});

describe('formatInitials()', () => {
	test('should format with dots', () => {
		expect(formatInitials('', '. ')).toBe('');
		expect(formatInitials('A', '. ')).toBe('A.');
		expect(formatInitials('AC', '. ')).toBe('A. C.');
		expect(formatInitials('AC', ' ')).toBe('A C');
		expect(formatInitials('AC', '.')).toBe('A.C.');
	});
});
