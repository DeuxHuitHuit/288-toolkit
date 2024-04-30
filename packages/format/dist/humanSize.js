/**@docs
 * This module makes it easy to format and display sizes in bytes in a human friendly
 * way. It provides a chain-able api for the limit and precision options.
 */
import { t } from './translations/filesize';
const units = ['b', 'kb', 'Mb', 'Gb', 'Tb', 'Pb'];
const BASE = 1024;
/**
 * The humanSize function takes a number as a parameter and returns a HumanSize object.
 * It makes sure the value is not negative.
 */
export const humanSize = (value) => {
    let limit = units.length - 1;
    let precision = 1;
    value = Math.max(0, value);
    return {
        /**
         * Takes a unit as a parameter and sets the limit property to the index of the unit in the units array.
         * @param unit the unit to limit to
         * @returns this
         */
        limit(unit) {
            limit = Math.min(units.indexOf(unit), units.length - 1);
            return this;
        },
        /**
         * Takes a number as a parameter and sets the precision property to the number.
         * It makes sure the number is not negative.
         * @param p the precision to set
         * @returns this
         */
        precision(p) {
            precision = Math.max(0, p);
            return this;
        },
        /**
         * Formats the value according to the limit and precision properties, and returns the result as a string.
         * @returns the formatted value
         */
        toString() {
            let iterations = 0;
            let formattedValue = value;
            while (formattedValue >= BASE && iterations < limit) {
                formattedValue /= BASE;
                iterations++;
            }
            return `${formattedValue.toFixed(precision)} ${t(units[iterations])}`;
        }
    };
};
