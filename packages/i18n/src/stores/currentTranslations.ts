import type { AnonymousObject, Maybe } from '@288-toolkit/types';
import { writable } from 'svelte/store';

export const currentTranslations = writable<Record<string, AnonymousObject>>({});
