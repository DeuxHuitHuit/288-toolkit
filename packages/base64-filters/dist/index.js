import { base64FromBytes, base64FromUrlSafe, base64ToBytes, base64ToUrlSafe } from '@288-toolkit/strings';
// #region Checks
/**
 * Checks if the given filters can be encoded as single values
 * @param filters The filters to check
 */
export const areFiltersSingleValue = (filters) => {
    return Object.values(filters).every((values) => values.length <= 1);
};
/**
 * Checks if the given bytes length can be decoded as single values filters for the given number of filters.
 * @param filters The number of filters
 * @param bytes The bytes to check
 */
const isLengthSingleValue = (filters, bytes) => bytes <= filters * 2;
/**
 * Checks if the given bytes can be decoded as single values filters
 * @param filters The filters to check
 * @param bytes The bytes to check
 */
export const areBytesSingleValue = (filters, bytes) => {
    return isLengthSingleValue(Object.keys(filters).length, bytes.length);
};
/**
 * Computes the required length to encode the given multi filters.
 * In some situation, the minimum length could be interpreted as a single value filter, so
 * an extra byte is required to differentiate.
 * @param filters The filters to encode
 */
export const computeFiltersLength = (filters) => {
    const minLength = Object.values(filters).reduce((acc, values) => {
        // 1 byte for length, 2 bytes per value
        return acc + 1 + values.length * 2;
    }, 0);
    if (minLength === 0) {
        return 0;
    }
    else if (isLengthSingleValue(Object.keys(filters).length, minLength)) {
        return minLength + 1;
    }
    return minLength;
};
/**
 * Checks if the given filter object is empty.
 * @param filters The filters to check
 */
export const areFiltersEmpty = (filters) => {
    // Check for no keys
    if (Object.keys(filters).length === 0) {
        return true;
    }
    // Check for no values
    if (Object.values(filters).every((values) => values.length === 0)) {
        return true;
    }
    return false;
};
// #endregion
// #region Encoding
/**
 * Converts the object representation of filters into an array of bytes.
 * This method allows to encode filters with zero or one value.
 * @param filters The filters to encode
 * @throws If a filter has more than one value or if a value is larger than 65535
 */
export const singleFiltersToBytes = (filters) => {
    // Validate that all values fit in 16 bits
    Object.values(filters).forEach((values) => {
        if (values.length > 1) {
            throw new Error('Filter values cannot have more than one value');
        }
        values.forEach((value) => {
            if (value < 0) {
                throw new Error('Filter values cannot be negative');
            }
            else if (value > 0xffff) {
                throw new Error('Filter values cannot be larger than 65535');
            }
        });
    });
    // Extract first value of each filter
    const source = Object.values(filters).map((values) => values[0] || 0);
    // Filter out trailing zeros
    for (let i = source.length - 1; i >= 0; i--) {
        if (source[i] !== 0) {
            source.length = i + 1;
            break;
        }
    }
    // Create a 16 bits array
    return new Uint8Array(new Uint16Array(source).buffer);
};
/**
 * Converts the object representation of filters into an array of bytes.
 * This method allows to encode filters with more than one value.
 * @see bytesToMultiFilters
 * @see computeFiltersLength
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export const multipleFiltersToBytes = (filters) => {
    const length = computeFiltersLength(filters);
    let index = 0;
    return Object.values(filters).reduce((acc, values) => {
        // Save the length as the first byte
        if (values.length > 0xff) {
            throw new Error('Filter value count cannot be larger than 255');
        }
        acc[index] = values.length;
        index++;
        // Save the values as 2 bytes each
        values.forEach((value) => {
            if (value < 0) {
                throw new Error('Filter values cannot be negative');
            }
            else if (value > 0xffff) {
                throw new Error('Filter values cannot be larger than 65535');
            }
            // lowest 8 bits
            acc[index] = value;
            index++;
            // highest 8 bits
            acc[index] = value >> 8;
            index++;
        });
        return acc;
    }, new Uint8Array(length).fill(0)); // Fill with zeros to avoid trailing bytes if padding is required
};
/**
 * Encodes the given filters into a base64 string.
 *
 * @see singleFiltersToBytes
 * @see multipleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export const encodeFilters = (filters) => {
    if (areFiltersEmpty(filters)) {
        return '';
    }
    return base64ToUrlSafe(base64FromBytes(areFiltersSingleValue(filters)
        ? singleFiltersToBytes(filters)
        : multipleFiltersToBytes(filters)));
};
/**
 * Encodes the given single filters into a base64 string.
 *
 * @see singleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than one value or if a value is larger than 65535
 */
export const encodeSingleFilters = (filters) => {
    if (areFiltersEmpty(filters)) {
        return '';
    }
    return base64ToUrlSafe(base64FromBytes(singleFiltersToBytes(filters)));
};
/**
 * Encodes the given multiple filters into a base64 string.
 *
 * @see multipleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export const encodeMultiFilters = (filters) => {
    if (areFiltersEmpty(filters)) {
        return '';
    }
    return base64ToUrlSafe(base64FromBytes(multipleFiltersToBytes(filters)));
};
// #endregion
// #region Decoding
/**
 * Converts the given bytes array into an object representation of filters.
 * This byte array must use the single value format.
 *
 * @see singleFiltersToBytes
 * @param bytes The bytes to decode
 * @param filters The Filter object to fill with the decoded values
 */
export const bytesToSingleFilters = (bytes, filters) => {
    const keys = Object.keys(filters);
    const values = new Uint16Array(bytes.buffer);
    keys.forEach((key, i) => {
        const value = values[i] || 0;
        filters[key] = (!value ? [] : [value]);
    });
};
/**
 * Converts the given bytes array into an object representation of filters.
 * This byte array must use the multi value format.
 *
 * @see multipleFiltersToBytes
 * @param bytes The bytes to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If the byte array is invalid
 */
export const bytesToMultiFilters = (bytes, filters) => {
    const keys = Object.keys(filters);
    let i = 0;
    let k = 0;
    // Iterate over the bytes and the keys, and fill the filters.
    // This will make sure we ignore trailing bytes.
    while (i < bytes.length && k < keys.length) {
        const key = keys[k];
        // Get the length of the next filter
        const length = bytes[i];
        i++;
        const values = [];
        for (let j = 0; j < length; j++) {
            if (i + 1 >= bytes.length) {
                throw new Error('Invalid filter length');
            }
            // Compute and push the value
            const lowest = bytes[i];
            const highest = bytes[i + 1] << 8;
            const value = lowest + highest;
            if (value) {
                values.push(value);
            }
            i += 2;
        }
        filters[key] = values;
        k++;
    }
};
/**
 * Validates the given bytes array.
 * @param bytes The bytes to validate
 * @throws If the bytes array is empty
 */
const validateBytes = (bytes) => {
    if (!bytes.length) {
        throw new Error('Invalid binary filters');
    }
};
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 *  @throws If there is an error decoding the filters
 */
export const decodeFilters = (base64, filters) => {
    if (!base64) {
        return;
    }
    const bytes = base64ToBytes(base64FromUrlSafe(base64));
    validateBytes(bytes);
    return areBytesSingleValue(filters, bytes)
        ? bytesToSingleFilters(bytes, filters)
        : bytesToMultiFilters(bytes, filters);
};
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeSingleFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If there is an error decoding the filters
 */
export const decodeSingleFilters = (base64, filters) => {
    if (!base64) {
        return;
    }
    const bytes = base64ToBytes(base64FromUrlSafe(base64));
    validateBytes(bytes);
    return bytesToSingleFilters(bytes, filters);
};
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeMultiFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If there is an error decoding the filters
 */
export const decodeMultiFilters = (base64, filters) => {
    if (!base64) {
        return;
    }
    const bytes = base64ToBytes(base64FromUrlSafe(base64));
    validateBytes(bytes);
    return bytesToMultiFilters(bytes, filters);
};
// #endregion
