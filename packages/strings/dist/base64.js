/**@docs
 * This module provides functions for converting strings to and from base64.
 * It supports both Node.js (using Buffer), the browser and edge runtime (web APIs).
 */
const hasBuffer = typeof Buffer !== 'undefined';
/**
 * Converts a string into a base64 encoded string
 * @param str The string to encode
 * @returns The base64 encoded string
 */
export const toBase64 = (str) => {
    return hasBuffer ? Buffer.from(str).toString('base64') : btoa(str);
};
/**
 * Converts a base64 encoded string into a string
 * @param str The base64 encoded string
 * @returns The decoded string
 */
export const fromBase64 = (str) => {
    return hasBuffer ? Buffer.from(str, 'base64').toString('ascii') : atob(str);
};
/**
 * Converts a valid base64 string into a url-safe base64 string
 * @param str the string to convert
 */
export const base64ToUrlSafe = (str) => {
    return str.replace(/\+/g, '~').replace(/\//g, '_').replace(/=+$/, '');
};
/**
 * Converts a url-safe base64 string into a valid base64 string
 * @param str the string to convert
 */
export const base64FromUrlSafe = (str) => {
    return str.replace(/~/g, '+').replace(/_/g, '/');
};
/**
 * Encodes an array of bytes into a base64 string
 * @param array The array to encode
 */
export const base64FromBytes = (array) => {
    return hasBuffer
        ? Buffer.from(array).toString('base64')
        : btoa(String.fromCharCode.apply(null, array));
};
/**
 * Decodes a base64 string into an array of bytes
 * @param base64 The string to decode
 */
export const base64ToBytes = (base64) => {
    return new Uint8Array(hasBuffer
        ? Buffer.from(base64, 'base64')
        : atob(base64)
            .split('')
            .map((c) => c.charCodeAt(0)));
};
