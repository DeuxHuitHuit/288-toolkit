import { describe, it, expect } from 'vitest';
import { hash } from '../src/hash';

describe('hash', () => {
	it('should create a SHA-1 hash by default', async () => {
		const result = await hash('hello');
		// SHA-1 hash of "hello"
		expect(result).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
	});

	it('should create a SHA-256 hash when specified', async () => {
		const result = await hash('hello', 'SHA-256');
		// SHA-256 hash of "hello"
		expect(result).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
	});

	it('should create different hashes for different inputs', async () => {
		const hash1 = await hash('hello');
		const hash2 = await hash('world');
		expect(hash1).not.toBe(hash2);
	});

	it('should create consistent hashes for same inputs', async () => {
		const hash1 = await hash('hello');
		const hash2 = await hash('hello');
		expect(hash1).toBe(hash2);
	});
});
