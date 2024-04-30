/**@docs
 * This modules offers function to convert a name to initials.
 * It also offers a function to get the proper font size for the initials.
 */
/**
 * Convert a name to initials.
 * @param name The name to convert.
 * @param max The maximum length of the initials.
 */
export declare const initials: (name: string, max?: number) => string;
/**
 * Get the proper font size for the initials.
 * The font sizes are based on the length of the initials.
 * If the initials are longer than the font sizes, the last font size is used.
 * @param initials The initials to get the font size for.
 * @param fontSizes The font sizes to use.
 */
export declare const fontSizeFromInitials: (initials: string, fontSizes: readonly string[]) => string;
/**
 * Formats initials by joining them with a string.
 * @param initials The initials to format.
 * @param join The string to join the initials with.
 */
export declare const formatInitials: (initials: string, join: string) => string;
