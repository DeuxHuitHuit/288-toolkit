import { writable } from 'svelte/store';
import type { Locale } from '../types/index.js';

export const currentLocale = writable<Locale>();
