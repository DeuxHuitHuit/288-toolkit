/// <reference types="svelte" />
import type { MeltActionReturn } from '../../internal/types.js';
import type { TagsInputEvents } from './events.js';
import type { CreateTagsInputProps, Tag, TagProps } from './types.js';
export declare function createTagsInput(props?: CreateTagsInputProps): {
    ids: {
        [x: string]: string;
    };
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => MeltActionReturn<TagsInputEvents['root']>, ([$disabled]: [boolean]) => {
            readonly 'data-melt-id': string;
            readonly 'data-disabled': true | undefined;
            readonly disabled: true | undefined;
        }, string>;
        input: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string>>], (node: HTMLInputElement) => MeltActionReturn<TagsInputEvents['input']>, ([$disabled, $placeholder]: [boolean, string]) => {
            readonly 'data-melt-id': string;
            readonly 'data-disabled': true | undefined;
            readonly disabled: true | undefined;
            readonly placeholder: string;
        }, string>;
        deleteTrigger: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Tag | null>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Tag | null>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => MeltActionReturn<TagsInputEvents['deleteTrigger']>, ([$selected, $editing, $disabled, $editable]: [Tag | null, Tag | null, boolean, boolean]) => (tag: TagProps) => {
            readonly 'aria-selected': boolean | undefined;
            readonly 'data-tag-id': string;
            readonly 'data-tag-value': string;
            readonly 'data-selected': "" | undefined;
            readonly 'data-editing': "" | undefined;
            readonly 'data-disabled': true | undefined;
            readonly disabled: true | undefined;
            readonly tabindex: -1;
        }, string>;
        edit: import("../../internal/helpers/index.js").MeltElement<import("svelte/store").Readable<(tag: Tag) => boolean>, (node: HTMLElement) => MeltActionReturn<TagsInputEvents['edit']>, ($isEditing: (tag: Tag) => boolean) => (tag: Tag) => {
            readonly 'aria-hidden': boolean;
            readonly 'data-tag-id': string;
            readonly 'data-tag-value': string;
            readonly hidden: true | undefined;
            readonly contenteditable: boolean;
            readonly tabindex: -1;
            readonly style: string | undefined;
        }, string>;
        tag: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Tag | null>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Tag | null>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLDivElement) => MeltActionReturn<TagsInputEvents['tag']>, ([$selected, $editing, $disabled, $editable]: [Tag | null, Tag | null, boolean, boolean]) => (tag: TagProps) => {
            readonly 'aria-hidden': boolean | undefined;
            readonly 'aria-selected': boolean | undefined;
            readonly 'data-tag-id': string;
            readonly 'data-tag-value': string;
            readonly 'data-selected': "" | undefined;
            readonly 'data-editable': "" | undefined;
            readonly 'data-editing': "" | undefined;
            readonly 'data-disabled': true | undefined;
            readonly disabled: true | undefined;
            readonly hidden: boolean | undefined;
            readonly tabindex: -1;
            readonly style: string | undefined;
        }, string>;
    };
    states: {
        tags: {
            update: (updater: import("svelte/store").Updater<Tag[]>, sideEffect?: ((newValue: Tag[]) => void) | undefined) => void;
            set: (this: void, value: Tag[]) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<Tag[]>, invalidate?: import("svelte/store").Invalidator<Tag[]> | undefined): import("svelte/store").Unsubscriber;
            get: () => Tag[];
            destroy?: (() => void) | undefined;
        };
        inputValue: import("svelte/store").Readable<string>;
        inputInvalid: import("svelte/store").Readable<boolean>;
        selected: import("svelte/store").Readable<Tag | null>;
    };
    helpers: {
        isSelected: import("svelte/store").Readable<(tag: Tag) => boolean>;
        isEditing: import("svelte/store").Readable<(tag: Tag) => boolean>;
        isInputValid: (v: string) => boolean;
        addTag: (v: string) => Promise<boolean>;
        updateTag: (tag: Tag, select?: boolean) => Promise<boolean>;
        removeTag: (t: Tag) => Promise<boolean>;
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        placeholder: string;
        disabled: boolean;
        editable: boolean;
        selected?: Tag | undefined;
        defaultTags: string[] | Tag[];
        tags?: import("svelte/store").Writable<Tag[]> | undefined;
        onTagsChange?: import("../../internal/helpers/index.js").ChangeFn<Tag[]> | undefined;
        unique: boolean;
        trim: boolean;
        blur: import("./types.js").Blur;
        addOnPaste: boolean;
        maxTags: number | undefined;
        allowed: string[];
        denied: string[];
        add: import("./types.js").AddTag | undefined;
        remove: import("./types.js").RemoveTag | undefined;
        update: import("./types.js").UpdateTag | undefined;
    }, "tags">>;
};
