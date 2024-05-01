import { expect, test } from 'vitest';
import { computeGeoDistance } from '../src/computeGeoDistance';

test('should return infinities', () => {
	expect(computeGeoDistance({ lat: 0, lng: 0 }, { lat: 1, lng: 1 })).toBe(-Infinity);
	expect(computeGeoDistance({ lat: 1, lng: NaN }, { lat: NaN, lng: 0 })).toBe(-Infinity);
	expect(computeGeoDistance({ lat: 1, lng: 1 }, { lat: NaN, lng: 0 })).toBe(Infinity);
	expect(computeGeoDistance({ lat: 1, lng: 1 }, { lat: 1, lng: NaN })).toBe(Infinity);
});

test('should return 0', () => {
	expect(computeGeoDistance({ lat: 1, lng: 1 }, { lat: 1, lng: 1 })).toBe(0);
});

test('should return 157.2254320380729 km', () => {
	expect(computeGeoDistance({ lat: 2, lng: 2 }, { lat: 1, lng: 1 })).toBe(157.2254320380729);
});

test('should return distance between Québec and Montréal', () => {
	expect(
		computeGeoDistance({ lat: 46.813878, lng: -71.207981 }, { lat: 45.50884, lng: -73.58781 })
	).toBe(233.75933452094267);
});

test('should return distance between New York and Montréal', () => {
	expect(
		computeGeoDistance({ lat: 40.712775, lng: -74.005973 }, { lat: 45.50884, lng: -73.58781 })
	).toBe(534.3750214478632);
});

test('should return distance between Paris and Montréal', () => {
	expect(
		computeGeoDistance({ lat: 48.856614, lng: 2.352222 }, { lat: 45.50884, lng: -73.58781 })
	).toBe(5506.0501418085105);
});
