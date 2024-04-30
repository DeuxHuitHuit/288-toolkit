/**@docs
 * This module provides functions for converting strings to and from base64.
 * It supports both Node.js (using Buffer), the browser and edge runtime (web APIs).
 */
/**
 * Converts a string into a base64 encoded string
 * @param str The string to encode
 * @returns The base64 encoded string
 */
export declare const toBase64: (str: string) => string;
/**
 * Converts a base64 encoded string into a string
 * @param str The base64 encoded string
 * @returns The decoded string
 */
export declare const fromBase64: (str: string) => string;
/**
 * Converts a valid base64 string into a url-safe base64 string
 * @param str the string to convert
 */
export declare const base64ToUrlSafe: (str: string) => string;
/**
 * Converts a url-safe base64 string into a valid base64 string
 * @param str the string to convert
 */
export declare const base64FromUrlSafe: (str: string) => string;
/**
 * Encodes an array of bytes into a base64 string
 * @param array The array to encode
 */
export declare const base64FromBytes: (array: Uint8Array) => string;
/**
 * Decodes a base64 string into an array of bytes
 * @param base64 The string to decode
 */
export declare const base64ToBytes: (base64: string) => Uint8Array;
