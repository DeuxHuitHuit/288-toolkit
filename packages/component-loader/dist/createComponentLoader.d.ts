import type { AnonymousObject } from '@288-toolkit/types';
import type { ComponentType } from 'svelte';
export type DynamicImportEntry = AnonymousObject;
export type DynamicImportEntryWithSvelteComponent<T extends DynamicImportEntry = DynamicImportEntry> = T & {
    svelteComponent?: ComponentType;
};
export type DynamicImport<TEntry extends DynamicImportEntry = DynamicImportEntry> = {
    key: string;
    getImport: (entry: TEntry) => void | Promise<{
        default: ComponentType;
    }>;
};
export declare const createComponentLoader: (dynamicImports: DynamicImport[]) => <TEntry extends DynamicImportEntry>(entry: TEntry) => Promise<DynamicImportEntryWithSvelteComponent<TEntry>>;
