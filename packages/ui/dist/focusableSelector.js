/**
 * A selector that matches all focusable elements.
 *
 * Credit: https://stackoverflow.com/a/30753870
 */
export const focusableSelector = [
    '[contentEditable=true]',
    '[tabindex]',
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'iframe',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])'
]
    .map((selector) => `${selector}:not([tabindex='-1'])`)
    .join(',');
