/**@docs
 * This module makes it easy to format and display sizes in bytes in a human friendly
 * way. It provides a chain-able api for the limit and precision options.
 */
import type { FilesizeTranslations } from './translations/filesize/en';
type Unit = keyof FilesizeTranslations;
interface HumanSize {
    limit(unit: Unit): HumanSize;
    precision(precision: number): HumanSize;
    toString(): string;
}
/**
 * The humanSize function takes a number as a parameter and returns a HumanSize object.
 * It makes sure the value is not negative.
 */
export declare const humanSize: (value: number) => HumanSize;
export {};
