import { describe, expect, test } from 'vitest';
import {
	areBytesSingleValue,
	areFiltersEmpty,
	areFiltersSingleValue,
	bytesToMultiFilters,
	bytesToSingleFilters,
	computeFiltersLength,
	decodeFilters,
	decodeMultiFilters,
	decodeSingleFilters,
	encodeFilters,
	encodeMultiFilters,
	encodeSingleFilters,
	multipleFiltersToBytes,
	singleFiltersToBytes
} from '../src/index';

describe('computeFiltersLength', () => {
	test('Empty object', () => {
		expect(computeFiltersLength({})).toBe(0);
	});
	test('Single value', () => {
		expect(computeFiltersLength({ a: [1] })).toBe(3);
		expect(computeFiltersLength({ a: [1], b: [], c: [1] })).toBe(7);
	});
	test('Multiple values', () => {
		expect(computeFiltersLength({ a: [], b: [1, 2] })).toBe(6);
		expect(computeFiltersLength({ a: [], b: [1, 2], c: [], d: [] })).toBe(9);
	});
});

describe('areFiltersSingleValue', () => {
	test('Empty object', () => {
		expect(areFiltersSingleValue({})).toBe(true);
	});
	test('Single value', () => {
		expect(areFiltersSingleValue({ a: [1] })).toBe(true);
		expect(areFiltersSingleValue({ a: [1], b: [], c: [1] })).toBe(true);
	});
	test('Multiple values', () => {
		expect(areFiltersSingleValue({ a: [], b: [1, 2] })).toBe(false);
	});
});

describe('areBytesSingleValue', () => {
	test('Empty array', () => {
		expect(areBytesSingleValue({}, new Uint8Array([]))).toBe(true);
	});
	test('Single value', () => {
		expect(areBytesSingleValue({ a: [] }, new Uint8Array([1]))).toBe(true);
		expect(areBytesSingleValue({ a: [] }, new Uint8Array([1, 2]))).toBe(true);
		expect(
			areBytesSingleValue({ a: [], b: [], c: [] }, new Uint8Array([0, 1, 0, 1, 0, 1]))
		).toBe(true);
		expect(
			areBytesSingleValue(
				{ a: [], b: [], c: [], d: [] },
				new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1])
			)
		).toBe(true);
		expect(
			areBytesSingleValue(
				{ a: [], b: [], c: [], d: [] },
				new Uint8Array([0, 1, 0, 1, 0, 1, 0, 1, 0])
			)
		).toBe(false);
	});
	test('Multiple values', () => {
		expect(areBytesSingleValue({ a: [], b: [] }, new Uint8Array([0, 2, 0, 1, 0, 2]))).toBe(
			false
		);
		expect(areBytesSingleValue({ a: [] }, new Uint8Array([2, 0, 1, 0, 2]))).toBe(false);
	});
});

describe('areFiltersEmpty', () => {
	test('Empty object', () => {
		expect(areFiltersEmpty({})).toBe(true);
	});
	test('Empty values', () => {
		expect(areFiltersEmpty({ a: [] })).toBe(true);
		expect(areFiltersEmpty({ a: [], b: [] })).toBe(true);
	});
	test('Non-empty values', () => {
		expect(areFiltersEmpty({ a: [1] })).toBe(false);
		expect(areFiltersEmpty({ a: [1], b: [] })).toBe(false);
		expect(areFiltersEmpty({ a: [], b: [1] })).toBe(false);
	});
});

describe('singleFiltersToBytes', () => {
	test('Empty object', () => {
		expect(singleFiltersToBytes({})).toEqual(new Uint8Array([]));
	});
	test('Single value', () => {
		expect(singleFiltersToBytes({ a: [1] })).toEqual(new Uint8Array([1, 0]));
	});
	test('Trailing zeros', () => {
		expect(singleFiltersToBytes({ a: [1], b: [], c: [] })).toEqual(new Uint8Array([1, 0]));
	});
	test('Multiple values', () => {
		expect(singleFiltersToBytes({ a: [1], b: [2] })).toEqual(new Uint8Array([1, 0, 2, 0]));
		expect(singleFiltersToBytes({ a: [1], b: [2], c: [], d: [1] })).toEqual(
			new Uint8Array([1, 0, 2, 0, 0, 0, 1, 0])
		);
		expect(singleFiltersToBytes({ a: [1], b: [1], c: [4000], d: [5000] })).toEqual(
			new Uint8Array([1, 0, 1, 0, 4000 % 256, 4000 / 256, 5000 % 256, 5000 / 256])
		);
	});
	test('Value out of range', () => {
		expect(() => singleFiltersToBytes({ a: [0xfffff], b: [256] })).toThrow();
	});
	test('Too many values', () => {
		expect(() => singleFiltersToBytes({ a: [0xffff, 0xffff], b: [256] })).toThrow();
	});
	test('Negative value', () => {
		expect(() => singleFiltersToBytes({ a: [-1] })).toThrow();
	});
});

describe('multipleFiltersToBytes', () => {
	test('Empty object', () => {
		expect(multipleFiltersToBytes({})).toEqual(new Uint8Array([]));
	});
	test('Single value', () => {
		expect(multipleFiltersToBytes({ a: [1] })).toEqual(new Uint8Array([1, 1, 0]));
	});
	test('Multiple single values', () => {
		expect(multipleFiltersToBytes({ a: [1], b: [2] })).toEqual(
			new Uint8Array([1, 1, 0, 1, 2, 0])
		);
		expect(multipleFiltersToBytes({ a: [1], b: [2], c: [], d: [1] })).toEqual(
			new Uint8Array([1, 1, 0, 1, 2, 0, 0, 1, 1, 0])
		);
		expect(multipleFiltersToBytes({ a: [1], b: [1], c: [4000], d: [5000] })).toEqual(
			new Uint8Array([1, 1, 0, 1, 1, 0, 1, 4000 % 256, 4000 / 256, 1, 5000 % 256, 5000 / 256])
		);
	});
	test('Multiple single values which requires padding', () => {
		expect(multipleFiltersToBytes({ a: [1, 2], b: [], c: [], d: [] })).toEqual(
			new Uint8Array([2, 1, 0, 2, 0, 0, 0, 0, 0])
		);
	});
	test('Multiple multiple values', () => {
		expect(multipleFiltersToBytes({ a: [256, 256], b: [2], c: [], d: [1, 4] })).toEqual(
			new Uint8Array([2, 0, 1, 0, 1, 1, 2, 0, 0, 2, 1, 0, 4, 0])
		);
	});
	test('Value out of range', () => {
		expect(() => multipleFiltersToBytes({ a: [0xfffff], b: [256] })).toThrow(
			'Filter values cannot be larger than 65535'
		);
	});
	test('Too many values', () => {
		expect(() => multipleFiltersToBytes({ a: new Array(257).fill(1), b: [256] })).toThrow(
			'Filter value count cannot be larger than 255'
		);
	});
	test('Negative value', () => {
		expect(() => multipleFiltersToBytes({ a: [-1] })).toThrow();
	});
});

describe('encodeFilters', () => {
	test('Empty object', () => {
		expect(encodeFilters({})).toBe('');
	});
	test('Single value', () => {
		expect(encodeFilters({ a: [1] })).toBe('AQA');
	});
	test('Single empty value', () => {
		expect(encodeFilters({ a: [] })).toBe('');
	});
	test('Multiple values', () => {
		expect(encodeFilters({ a: [1, 2] })).toBe('AgEAAgA');
	});
	test('Multiple empty values', () => {
		expect(encodeFilters({ a: [], b: [] })).toBe('');
	});
	test('Multiple single value', () => {
		expect(encodeFilters({ a: [1], b: [1] })).toBe('AQABAA');
		expect(encodeFilters({ a: [1], b: [1], c: [4000], d: [5000] })).toBe('AQABAKAPiBM');
		expect(encodeFilters({ a: [100], b: [299], c: [3], d: [2550] })).toBe('ZAArAQMA9gk');
	});
	test('Multiple single value with trailing zeros', () => {
		expect(encodeFilters({ a: [1], b: [1], c: [0], d: [0] })).toBe('AQABAA');
	});
	test('Multiple single value with leading zeros', () => {
		expect(encodeFilters({ a: [0], b: [0], c: [1], d: [0] })).toBe('AAAAAAEA');
	});
	test('Multiple multiple values', () => {
		expect(encodeFilters({ a: [1, 2], b: [], c: [3000, 4000, 5000, 6000], d: [900] })).toBe(
			'AgEAAgAABLgLoA~IE3AXAYQD'
		);
	});
});

describe('encodeSingleFilters', () => {
	test('Empty object', () => {
		expect(encodeSingleFilters({})).toBe('');
	});
	test('Single value', () => {
		expect(encodeSingleFilters({ a: [1] })).toBe('AQA');
	});
	test('Single empty value', () => {
		expect(encodeSingleFilters({ a: [] })).toBe('');
	});
});

describe('encodeMultiFilters', () => {
	test('Empty object', () => {
		expect(encodeMultiFilters({})).toBe('');
	});
	test('Multiple single value', () => {
		expect(encodeMultiFilters({ a: [1], b: [1] })).toBe('AQEAAQEA');
		expect(encodeMultiFilters({ a: [1], b: [1], c: [4000], d: [5000] })).toBe(
			'AQEAAQEAAaAPAYgT'
		);
		expect(encodeMultiFilters({ a: [100], b: [299], c: [3], d: [2550] })).toBe(
			'AWQAASsBAQMAAfYJ'
		);
	});
	test('Multiple single values which requires padding', () => {
		expect(encodeMultiFilters({ a: [1, 2], b: [], c: [], d: [] })).toEqual('AgEAAgAAAAAA');
	});
	test('Multiple multiple values', () => {
		expect(
			encodeMultiFilters({ a: [1, 2], b: [], c: [3000, 4000, 5000, 6000], d: [900] })
		).toBe('AgEAAgAABLgLoA~IE3AXAYQD');
	});
});

describe('bytesToSingleFilters', () => {
	test('Empty array', () => {
		const filters = { a: [] };
		bytesToSingleFilters(new Uint8Array([]), filters);
		expect(filters).toEqual({ a: [] });
	});
	test('Single value', () => {
		const filters = { a: [] };
		bytesToSingleFilters(new Uint8Array([1, 0]), filters);
		expect(filters).toEqual({ a: [1] });
	});
	test('Multiple values', () => {
		const filters = { a: [], b: [] };
		bytesToSingleFilters(new Uint8Array([1, 0, 2, 0]), filters);
		expect(filters).toEqual({ a: [1], b: [2] });

		const filters2 = { a: [], b: [], c: [], d: [] };
		bytesToSingleFilters(
			new Uint8Array([1, 0, 1, 0, 4000 % 256, 4000 / 256, 5000 % 256, 5000 / 256]),
			filters2
		);
		expect(filters2).toEqual({ a: [1], b: [1], c: [4000], d: [5000] });
	});
	test('Multiple un-padded values', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		bytesToSingleFilters(new Uint8Array([1, 0, 2, 0]), filters);
		expect(filters).toEqual({ a: [1], b: [2], c: [], d: [] });
	});
	test('Leading zero', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		bytesToSingleFilters(new Uint8Array([0, 0, 1, 0, 2, 0, 0, 2]), filters);
		expect(filters).toEqual({ a: [], b: [1], c: [2], d: [512] });
	});
});

describe('bytesToMultiFilters', () => {
	test('Empty array', () => {
		const filters = { a: [] };
		bytesToMultiFilters(new Uint8Array([]), filters);
		expect(filters).toEqual({ a: [] });
	});
	test('Single value', () => {
		const filters = { a: [] };
		bytesToMultiFilters(new Uint8Array([1, 1, 0]), filters);
		expect(filters).toEqual({ a: [1] });
	});
	test('Multiple single values', () => {
		const filters = { a: [], b: [] };
		bytesToMultiFilters(new Uint8Array([1, 1, 0, 1, 2, 0]), filters);
		expect(filters).toEqual({ a: [1], b: [2] });

		bytesToMultiFilters(new Uint8Array([1, 5, 0, 0]), filters);
		expect(filters).toEqual({ a: [5], b: [] });
	});
	test('Multiple single values which requires padding', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		bytesToMultiFilters(new Uint8Array([2, 1, 0, 2, 0, 0, 0, 0, 0]), filters);
		expect(filters).toEqual({ a: [1, 2], b: [], c: [], d: [] });
	});
	test('Single multiple values', () => {
		const filters = { a: [], b: [] };
		bytesToMultiFilters(new Uint8Array([2, 1, 0, 2, 0, 1, 1, 0]), filters);
		expect(filters).toEqual({ a: [1, 2], b: [1] });

		const filters2 = { a: [], b: [], c: [], d: [] };
		bytesToMultiFilters(
			new Uint8Array([
				1,
				1,
				0,
				1,
				1,
				0,
				1,
				4000 % 256,
				4000 / 256,
				1,
				5000 % 256,
				5000 / 256
			]),
			filters2
		);
		expect(filters2).toEqual({ a: [1], b: [1], c: [4000], d: [5000] });
	});
	test('Multiple multiple values', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		bytesToMultiFilters(new Uint8Array([2, 0, 1, 0, 1, 1, 2, 0, 0, 2, 1, 0, 4, 0]), filters);
		expect(filters).toEqual({ a: [256, 256], b: [2], c: [], d: [1, 4] });
	});
	test('Invalid filter length', () => {
		expect(() => {
			const filters = { a: [], b: [], c: [], d: [] };
			bytesToMultiFilters(
				new Uint8Array([32, 0, 1, 0, 1, 1, 2, 0, 0, 2, 1, 0, 4, 0]),
				filters
			);
		}).toThrow('Invalid filter length');
	});
});

describe('decodeFilters', () => {
	test('Empty string', () => {
		expect(decodeFilters('', {})).toBeUndefined();
	});
	test('Invalid string', () => {
		expect(() => decodeFilters('a', {})).toThrow();
	});
	test('Empty value', () => {
		const filters = { a: [] };
		expect(() => decodeFilters('aA', filters)).toThrow();
	});
	test('Single value', () => {
		const filters = { a: [] };
		decodeFilters('AQA', filters);
		expect(filters).toEqual({ a: [1] });
	});
	test('Multiple values', () => {
		const filters = { a: [] };
		decodeFilters('AgEAAgA', filters);
		expect(filters).toEqual({ a: [1, 2] });
	});

	test('Multiple single value', () => {
		const filters = { a: [], b: [] };
		decodeFilters('AQABAA', filters);
		expect(filters).toEqual({ a: [1], b: [1] });

		const filters2 = { a: [], b: [], c: [], d: [] };
		decodeFilters('AQABAKAPiBM', filters2);
		expect(filters2).toEqual({ a: [1], b: [1], c: [4000], d: [5000] });
		decodeFilters('ZAArAQMA9gk', filters2);
		expect(filters2).toEqual({ a: [100], b: [299], c: [3], d: [2550] });
	});

	test('Multiple single value with trailing zeros', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		decodeFilters('AQABAA', filters);
		expect(filters).toEqual({ a: [1], b: [1], c: [], d: [] });
	});

	test('Multiple single value with leading zeros', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		decodeFilters('AAAAAAEA', filters);
		expect(filters).toEqual({ a: [], b: [], c: [1], d: [] });
	});
	test('Multiple multiple values', () => {
		expect(encodeFilters({ a: [1, 2], b: [], c: [3000, 4000, 5000, 6000], d: [900] })).toBe(
			'AgEAAgAABLgLoA~IE3AXAYQD'
		);
	});
});

describe('decodeSingleFilters', () => {
	test('Empty string', () => {
		expect(decodeSingleFilters('', {})).toBeUndefined();
	});
	test('Invalid string', () => {
		expect(() => decodeSingleFilters('a', {})).toThrow();
	});
	test('Empty value', () => {
		const filters = { a: [] };
		expect(() => decodeSingleFilters('aA', filters)).toThrow();
	});
	test('Single value', () => {
		const filters = { a: [] };
		decodeSingleFilters('AQA', filters);
		expect(filters).toEqual({ a: [1] });
	});
});

describe('decodeMultiFilters', () => {
	test('Empty string', () => {
		expect(decodeMultiFilters('', {})).toBeUndefined();
	});
	test('Invalid string', () => {
		expect(() => decodeMultiFilters('a', {})).toThrow();
	});
	test('Empty value', () => {
		const filters = { a: [] };
		expect(() => decodeMultiFilters('aA', filters)).toThrow();
	});
	test('Multiple single values which requires padding', () => {
		const filters = { a: [], b: [], c: [], d: [] };
		decodeMultiFilters('AgEAAgAAAAAA', filters);
		expect(filters).toEqual({ a: [1, 2], b: [], c: [], d: [] });
	});
	test('Multiple values', () => {
		const filters = { a: [] };
		decodeMultiFilters('AgEAAgA', filters);
		expect(filters).toEqual({ a: [1, 2] });
	});
});

describe('end to end', () => {
	test('encode -> decode single values', () => {
		const filters = { a: [1], b: [4], c: [7] };
		const encoded = encodeFilters(filters);
		const decoded = { a: [], b: [], c: [] };
		decodeFilters(encoded, decoded);
		expect(decoded).toEqual(filters);
	});
	test('encode -> decode multiple values', () => {
		const filters = { a: [1, 2, 3], b: [4, 5, 6], c: [7, 8, 9] };
		const encoded = encodeFilters(filters);
		const decoded = { a: [], b: [], c: [] };
		decodeFilters(encoded, decoded);
		expect(decoded).toEqual(filters);
	});
	test('encode -> decode multiple values with padding', () => {
		const filters = { a: [1, 2], b: [], c: [] };
		const encoded = encodeFilters(filters);
		const decoded = { a: [], b: [], c: [] };
		decodeFilters(encoded, decoded);
		expect(decoded).toEqual(filters);
	});
});
