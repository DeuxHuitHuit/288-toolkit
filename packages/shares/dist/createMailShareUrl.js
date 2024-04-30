/**
 * Creates a mailto URL with the given parameters.
 */
export const createMailShareUrl = (params) => {
    const paramsString = new URLSearchParams(params).toString();
    return `mailto:${params.email || ''}${paramsString ? `?${paramsString}` : ''}`;
};
