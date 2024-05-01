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
/**
 * Compute the distance between two points on the earth's surface.
 * @param point1 GeoPoint
 * @param point2 GeoPoint
 * @returns The distance in kilometers
 */
export declare const computeGeoDistance: (point1: GeoPoint, point2: GeoPoint) => number;
