import { makeElement } from '@melt-ui/svelte/internal/helpers';
import { derived } from 'svelte/store';
export const DEFAULT_TYPE = 'text';
export const createValidatedField = (options) => {
    const { type, name, errors, values } = options;
    const focusOnError = options.focusOnError !== false;
    const errorId = `${name}-error`;
    const value = derived(values, ($values) => $values[name]);
    const error = derived(errors, ($errors) => $errors[name]);
    const input = makeElement('input', {
        stores: [value, error],
        returned: ([value, error]) => {
            return {
                type: type ?? DEFAULT_TYPE,
                name,
                value,
                'aria-invalid': !!error || null,
                'aria-describedby': error ? errorId : null
            };
        },
        action: (node) => {
            if (!focusOnError) {
                return;
            }
            const destroy = error.subscribe(($error) => {
                if ($error) {
                    node.focus();
                }
            });
            return { destroy };
        }
    });
    const hint = makeElement('hint', {
        stores: error,
        returned: () => {
            return {
                id: errorId
            };
        }
    });
    return {
        elements: { input, hint },
        helpers: {
            value,
            error
        }
    };
};
