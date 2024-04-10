/**
 *
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const unCapitalize = (str) => str.charAt(0).toLowerCase() + str.slice(1);

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const removeWhitespace = (str) => str.replace(/\s/g, '');
