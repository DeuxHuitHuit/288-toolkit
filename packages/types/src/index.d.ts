/**
 * Allow `null` to be a valid value for `T`.
 */
export type Maybe<T> = T | null;

/**
 * Allow `undefined` to be a valid value for `T`.
 */
export type MaybeUndefined<T> = T | undefined;

/**
 * Allow to handle a promise of T or T itself.
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * Copy the maybe-ness of `T` to `U`.
 * If `T` is a nullable type, wrap `U` in `Maybe`, otherwise, `U` is `NonNullable`.
 */
export type MaybeCopy<T, U> = T extends null ? Maybe<U> : NonNullable<U>;

/**
 * If `T` is a non-nullable subtype of `U`, return `T`, otherwise, return `null`.
 * This is useful for narrowing types from `Maybe<T>` to either non-null `T`, `Maybe<T>` or `null`.
 * This situation can arise when using `Maybe<T>` as a parameter and `Maybe<U>` as a return type.
 */
export type MaybeUnwrap<T, U> = T extends U ? (T extends null ? never : T) : null;

/**
 * This type allows you to narrow-down a base type in an union type.
 */
export type WithAutoComplete<T, U = string> = T | (U & Record<never, never>);

/**
 * This is the empty string type.
 */
export type EmptyString = '';

/**
 * This is a narrowed down version of the string which excludes the empty string.
 */
export type NonEmptyString<T extends string = string> = T extends EmptyString ? never : T;

/**
 * A plain object with string keys and values of type `T`.
 */
export type AnonymousObject<T = unknown> = Record<string, T>;

export type Mutable<T> = T extends object
	? {
			-readonly [K in keyof T]: T[K];
		}
	: T;
// From: https://stackoverflow.com/questions/53832989/typescript-recursive-deep-mutable-with-generics-error-t-is-not-assignable-to
export type DeepMutable<T> = T extends object
	? {
			-readonly [K in keyof T]: DeepMutable<T[K]>;
		}
	: T;

export type ToString<T> = T extends string ? string : T;
export type DeepToString<T> = T extends object
	? {
			[K in keyof T]: DeepToString<T[K]>;
		}
	: ToString<T>;

export type DeepTo<X, T> = T extends object
	? {
			[K in keyof T]: DeepTo<X, T[K]>;
		}
	: T extends Array<infer U>
		? Array<DeepTo<X, U>>
		: T extends boolean
			? boolean
			: T extends number
				? number
				: T extends string
					? string
					: X;

export type PropertyStringPath<T extends object, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends object
			? `${Prefix}${K}` | PropertyStringPath<T[K], `${Prefix}${K}.`>
			: `${Prefix}${K}`
		: never;
}[keyof T];

/**
 * Creates a union of T and T[].
 */
export type ArrayOrT<T> = T | T[];
