import type { TranslateParams } from '../types';
export declare const USER_LOCALE: unique symbol;
export type PluralizeRule = number | `${number}-${number}` | Intl.LDMLPluralRule;
/**
 * Pluralize a message according to the count provided in the data.
 */
export declare const pluralize: (message: string, data: TranslateParams, locale?: Maybe<string | typeof USER_LOCALE>) => string;
