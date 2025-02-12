/**
 * Decodes the pathname by splitting it into parts, decoding each part, and joining them with slashes.
 * @param pathname - The pathname to decode.
 * @returns The decoded pathname.
 */
export const decodePath = (pathname) => {
    return pathname.split('/').map(decodeURIComponent).join('/');
};
