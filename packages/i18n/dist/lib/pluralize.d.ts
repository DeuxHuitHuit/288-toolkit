import type { Maybe } from '@288-toolkit/types';
import type { TranslateParams } from '../types/index.js';
export declare const USER_LOCALE: unique symbol;
type USER_LOCALE = typeof USER_LOCALE;
export type PluralizeRule = number | `${number}-${number}` | Intl.LDMLPluralRule;
/**
 * Pluralize a message according to the count provided in the data.
 */
export declare const pluralize: (message: string, data: TranslateParams, locale?: Maybe<string | USER_LOCALE>) => string;
export {};
