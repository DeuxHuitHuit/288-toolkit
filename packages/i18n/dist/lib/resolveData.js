export const resolveData = (value, data) => {
    const isString = typeof value === 'string';
    const strVal = isString ? value : JSON.stringify(value);
    const resolvedValue = strVal.replace(/\{([A-Za-z0-9_$]+)\}/g, (match) => {
        const key = match.slice(1, -1);
        const value = data[key];
        return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
            ? `${value}`
            : `{${key}}`;
    });
    return isString ? resolvedValue : JSON.parse(resolvedValue);
};
