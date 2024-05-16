import { SvelteComponent } from "svelte";
import type { Maybe } from '@288-toolkit/types';
import type { DynamicImportEntryWithSvelteComponent } from './createComponentLoader';
declare class __sveltets_Render<TEntry extends DynamicImportEntryWithSvelteComponent> {
    props(): {
        entries?: Maybe<TEntry>[] | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            component: any;
            entry: Maybe<TEntry>;
        };
    };
}
export type ComponentSelectorProps<TEntry extends DynamicImportEntryWithSvelteComponent> = ReturnType<__sveltets_Render<TEntry>['props']>;
export type ComponentSelectorEvents<TEntry extends DynamicImportEntryWithSvelteComponent> = ReturnType<__sveltets_Render<TEntry>['events']>;
export type ComponentSelectorSlots<TEntry extends DynamicImportEntryWithSvelteComponent> = ReturnType<__sveltets_Render<TEntry>['slots']>;
export default class ComponentSelector<TEntry extends DynamicImportEntryWithSvelteComponent> extends SvelteComponent<ComponentSelectorProps<TEntry>, ComponentSelectorEvents<TEntry>, ComponentSelectorSlots<TEntry>> {
}
export {};
