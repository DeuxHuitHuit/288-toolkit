/**
 * A point on the earth's surface.
 * @property lat The latitude of the point
 * @property lng The longitude of the point
 * @example
 * const point1 = { lat: 51.509865, lng: -0.118092 };
 */
export interface GeoPoint {
	lat: number;
	lng: number;
}

const R = 6371e3; // earth radius in meters

/**
 * Compute the distance between two points on the earth's surface.
 * @param point1 GeoPoint
 * @param point2 GeoPoint
 * @returns The distance in kilometers
 */
export const computeGeoDistance = (point1: GeoPoint, point2: GeoPoint) => {
	if (!point1.lng || !point1.lat || isNaN(point1.lng) || isNaN(point1.lat)) {
		return -Infinity;
	} else if (!point2.lng || !point2.lat || isNaN(point2.lng) || isNaN(point2.lat)) {
		return Infinity;
	}

	const phi = (point2.lat * Math.PI) / 180; // angle in radians
	const pointPhi = (point1.lat * Math.PI) / 180;
	const deltaTheta = ((point1.lng - point2.lng) * Math.PI) / 180;
	const deltaPhi = pointPhi - phi;

	const a =
		Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
		Math.cos(phi) * Math.cos(pointPhi) * Math.sin(deltaTheta / 2) * Math.sin(deltaTheta / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = R * c; // in meters

	return distance / 1000; // in kilometers
};
