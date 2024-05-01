type Filters = Record<string, number[]>;
/**
 * Checks if the given filters can be encoded as single values
 * @param filters The filters to check
 */
export declare const areFiltersSingleValue: (filters: Filters) => boolean;
/**
 * Checks if the given bytes can be decoded as single values filters
 * @param filters The filters to check
 * @param bytes The bytes to check
 */
export declare const areBytesSingleValue: (filters: Filters, bytes: Uint8Array) => boolean;
/**
 * Computes the required length to encode the given multi filters.
 * In some situation, the minimum length could be interpreted as a single value filter, so
 * an extra byte is required to differentiate.
 * @param filters The filters to encode
 */
export declare const computeFiltersLength: (filters: Filters) => number;
/**
 * Checks if the given filter object is empty.
 * @param filters The filters to check
 */
export declare const areFiltersEmpty: (filters: Filters) => boolean;
/**
 * Converts the object representation of filters into an array of bytes.
 * This method allows to encode filters with zero or one value.
 * @param filters The filters to encode
 * @throws If a filter has more than one value or if a value is larger than 65535
 */
export declare const singleFiltersToBytes: (filters: Filters) => Uint8Array;
/**
 * Converts the object representation of filters into an array of bytes.
 * This method allows to encode filters with more than one value.
 * @see bytesToMultiFilters
 * @see computeFiltersLength
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export declare const multipleFiltersToBytes: (filters: Filters) => Uint8Array;
/**
 * Encodes the given filters into a base64 string.
 *
 * @see singleFiltersToBytes
 * @see multipleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export declare const encodeFilters: (filters: Filters) => any;
/**
 * Encodes the given single filters into a base64 string.
 *
 * @see singleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than one value or if a value is larger than 65535
 */
export declare const encodeSingleFilters: (filters: Filters) => any;
/**
 * Encodes the given multiple filters into a base64 string.
 *
 * @see multipleFiltersToBytes
 * @param filters The filters to encode
 * @throws If a filter has more than 255 values or if a value is larger than 65535
 */
export declare const encodeMultiFilters: (filters: Filters) => any;
/**
 * Converts the given bytes array into an object representation of filters.
 * This byte array must use the single value format.
 *
 * @see singleFiltersToBytes
 * @param bytes The bytes to decode
 * @param filters The Filter object to fill with the decoded values
 */
export declare const bytesToSingleFilters: <T extends Filters>(bytes: Uint8Array, filters: T) => void;
/**
 * Converts the given bytes array into an object representation of filters.
 * This byte array must use the multi value format.
 *
 * @see multipleFiltersToBytes
 * @param bytes The bytes to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If the byte array is invalid
 */
export declare const bytesToMultiFilters: <T extends Filters>(bytes: Uint8Array, filters: T) => void;
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 *  @throws If there is an error decoding the filters
 */
export declare const decodeFilters: <T extends Filters>(base64: string, filters: T) => void;
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeSingleFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If there is an error decoding the filters
 */
export declare const decodeSingleFilters: <T extends Filters>(base64: string, filters: T) => void;
/**
 * Decodes the given base64 string into an object representation of filters.
 *
 * @see encodeMultiFilters
 * @param base64 The base64 string to decode
 * @param filters The Filter object to fill with the decoded values
 * @throws If there is an error decoding the filters
 */
export declare const decodeMultiFilters: <T extends Filters>(base64: string, filters: T) => void;
export {};
