/**
 * Returns a string of URL parameters from an object.
 */
export const objectToQueryString = (options) => {
    const params = Object.entries(options).reduce((paramsAcc, [key, value]) => {
        if (value !== null) {
            paramsAcc[key] = value;
        }
        return paramsAcc;
    }, {});
    return new URLSearchParams(params).toString();
};
