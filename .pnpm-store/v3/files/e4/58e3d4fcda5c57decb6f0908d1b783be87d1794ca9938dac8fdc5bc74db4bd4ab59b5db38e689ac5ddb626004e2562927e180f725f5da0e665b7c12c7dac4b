// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(fn, wait = 500) {
    let timeout;
    const debounced = (...args) => {
        clearTimeout(timeout);
        const later = () => fn(...args);
        timeout = setTimeout(later, wait);
    };
    debounced.destroy = () => clearTimeout(timeout);
    return debounced;
}
