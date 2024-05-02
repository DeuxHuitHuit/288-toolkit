import type { AnonymousObject } from '@288-toolkit/types';
import { BROWSER } from 'esm-env';
import clone from 'just-clone';
import type { ComponentType } from 'svelte';

export type DynamicImportEntry = AnonymousObject;

export type DynamicImportEntryWithSvelteComponent<
	T extends DynamicImportEntry = DynamicImportEntry
> = T & {
	svelteComponent?: ComponentType;
};

export type DynamicImport = {
	key: string;
	getImport: <TEntry extends DynamicImportEntry>(
		entry: TEntry
	) => void | Promise<{ default: ComponentType }>;
};

const getAllImports = (
	obj: DynamicImportEntry,
	parts: string[],
	getImport: DynamicImport['getImport']
) => {
	let imports: (() => Promise<void>)[] = [];
	const firstPart = parts[0];
	let value = firstPart ? obj[firstPart] : obj;
	if (!value) {
		return imports;
	}
	while (parts.length > 1 && typeof value === 'object') {
		parts.shift();
		if (Array.isArray(value)) {
			const newImports = (value as DynamicImportEntryWithSvelteComponent[]).flatMap(
				(item) => {
					return getAllImports(item, parts.slice(), getImport);
				}
			);
			imports = [...imports, ...newImports];
		}
		value = value?.[parts[0]];
	}
	if (Array.isArray(value)) {
		const newImports = (value as DynamicImportEntryWithSvelteComponent[]).map((item) => {
			if (!!item && typeof item === 'object') {
				const newImport = async () => {
					item.svelteComponent = (await getImport(item))?.default;
				};
				return newImport;
			}
			return () => Promise.resolve();
		});
		imports = [...imports, ...newImports];
	} else if (!!value && typeof value === 'object') {
		const newImport = async () => {
			(value as DynamicImportEntryWithSvelteComponent).svelteComponent = (
				await getImport(value as DynamicImportEntryWithSvelteComponent)
			)?.default;
		};
		imports.push(newImport);
	}
	return imports.flat();
};

const getComponentsImports = (
	entry: DynamicImportEntryWithSvelteComponent,
	dynamicImports: DynamicImport[]
) => {
	return dynamicImports
		.map(({ key, getImport }) => {
			return getAllImports(entry, key.split('.'), getImport);
		})
		.flat();
};

export const createComponentLoader = (dynamicImports: DynamicImport[]) => {
	return async <TEntry extends DynamicImportEntry>(entry: TEntry) => {
		if (!entry) {
			return entry;
		}
		const entryCopy = clone<DynamicImportEntryWithSvelteComponent<TEntry>>(entry);
		try {
			const imports = getComponentsImports(entryCopy, dynamicImports);
			await Promise.allSettled(
				imports.map(async (runImport) => {
					return runImport();
				})
			);
			return entryCopy;
		} catch (error) {
			if (!BROWSER) {
				console.error(error);
			}
			return entryCopy;
		}
	};
};
