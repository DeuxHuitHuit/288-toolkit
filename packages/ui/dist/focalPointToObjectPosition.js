/**
 * Converts a focal point value between 0 and 1 to a CSS object-position value.
 */
export const focalPointToObjectPosition = (focalPoint) => {
    const percentage = focalPoint * 100;
    return percentage.toFixed(2) + '%';
};
