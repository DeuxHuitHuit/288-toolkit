import clone from 'just-clone';
const getAllImports = (obj, parts, getImport) => {
    let imports = [];
    const firstPart = parts[0];
    let value = firstPart ? obj[firstPart] : obj;
    if (!value) {
        return imports;
    }
    while (parts.length > 1 && typeof value === 'object') {
        parts.shift();
        if (Array.isArray(value)) {
            const newImports = value.flatMap((item) => {
                return getAllImports(item, parts.slice(), getImport);
            });
            imports = [...imports, ...newImports];
        }
        value = value?.[parts[0]];
    }
    if (Array.isArray(value)) {
        const newImports = value.map((item) => {
            if (!!item && typeof item === 'object') {
                const newImport = async () => {
                    item.svelteComponent = (await getImport(item))?.default;
                };
                return newImport;
            }
            return () => Promise.resolve();
        });
        imports = [...imports, ...newImports];
    }
    else if (!!value && typeof value === 'object') {
        const newImport = async () => {
            value.svelteComponent = (await getImport(value))?.default;
        };
        imports.push(newImport);
    }
    return imports.flat();
};
const getComponentsImports = (entry, dynamicImports) => {
    return dynamicImports
        .map(({ key, getImport }) => {
        return getAllImports(entry, key.split('.'), getImport);
    })
        .flat();
};
export const createComponentLoader = (dynamicImports) => {
    return async (entry) => {
        if (!entry) {
            return entry;
        }
        const entryCopy = clone(entry);
        try {
            const imports = getComponentsImports(entryCopy, dynamicImports);
            await Promise.allSettled(imports.map(async (runImport) => {
                return runImport();
            }));
            return entryCopy;
        }
        catch (error) {
            console.error(error);
            return entryCopy;
        }
    };
};
