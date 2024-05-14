export const zodErrorToObject = (zodError) => {
    const fieldErrors = zodError.flatten().fieldErrors;
    const errors = Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [
        key,
        value?.[0] ?? ''
    ]));
    return errors;
};
