import type { Character } from '$lib/types/character';
import { supabase } from './client';

export async function getPublicCharacters(search = '*') {
	let { data: characters, error } = await supabase
		.from<Character>('characters')
		.select('grid, name')

		// is search is provided, only select the characters that contains "search"
		.ilike('name', search);

	return { characters, error };
}
