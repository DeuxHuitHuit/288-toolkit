/**
 * @param {string} propName
 * @returns A unique key for a translations object
 */
export const getTranslationKey = (propName: string) => `translations_${propName}`;
