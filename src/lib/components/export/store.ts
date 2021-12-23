import type { Character } from '$lib/types/character';
import type { ExportOption } from '$lib/types/export';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const currentExport: Writable<{
	type: ExportOption;
	character: Character;
} | null> = writable(null);
