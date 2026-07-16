/**@docs
 * This module provide functions to convert a locale to its parts.
 */
/**
 * @returns The language part of the given locale.
 */
export declare const localeToLanguage: <T extends `${string}-${string}` = `${string}-${string}`, U extends string = NonNullable<T extends `${infer Lang}-${infer _}` ? Lang : never>>(locale: T) => U;
/**
 * @returns The language part of the given locale.
 */
export declare const localeToRegion: <T extends `${string}-${string}` = `${string}-${string}`, U extends string = NonNullable<T extends `${infer _}-${infer Region}` ? Region : never>>(locale: T) => U;
