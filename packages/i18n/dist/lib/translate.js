import { BROWSER, DEV } from 'esm-env';
import resolvePath from 'just-safe-get';
import { pluralize } from './pluralize.js';
import { resolveData } from './resolveData.js';
/**
 * Translates a specific key, from a specific translation object.
 * It also replaces dynamic values in the translations.
 *
 * The type parameters are used to infer the function's parameters types and return type.
 * `T` is the type of the translation object, `TReturnType` is the requested return type,
 * `TInferredOrString` is the actual return type of the function.
 * We need to coerce the return type to a string when typescript
 * can not infer the return type constraint (i.e. is resolve simply to `Translation.DataType`).
 * This type is only used for type inference. To do use it when calling the function itself.
 *
 * @param translations The translation data object
 * @param path The property path to the requested data
 * @param data The data to replace in the translation
 * @returns The translated value
 */
export const translate = (translations, path, data = {}) => {
    const stringPath = path;
    const value = resolvePath(translations, stringPath);
    if (!value) {
        DEV && BROWSER && console.warn(`Translation missing for key: ${stringPath}`);
        return '';
    }
    const pluralizedValue = pluralize(value, data);
    return resolveData(pluralizedValue, data);
};
