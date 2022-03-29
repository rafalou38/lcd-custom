import type { Character, SavedCharacter } from '$lib/types/character';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { supabase } from './client';
import { userStore } from './auth';
import type { User } from '@supabase/supabase-js';
import { buildGrid, loadGrid } from '$lib/utils/grid';

export const publishedCharacters: Writable<Character[]> = writable([]);

userStore.subscribe(async (user) => {
	if (user) {
		const { characters: published } = await getPublishedCharacters(user);
		if (published) {
			publishedCharacters.set(
				published.map((character) => {
					const grid = loadGrid(character);
					return {
						...character,
						id: character.id,
						saved: false,
						published: true,
						grid,
						width: grid[0].length,
						height: grid.length
					};
				})
			);
		}
	}
});
export function prepareCharacterForPub(character: Character) {
	return {
		...character,
		saved: false,
		published: true,
		width: character.grid[0].length,
		height: character.grid.length
	};
}
export async function removePublishedCharacters(character: Character) {
	const { data: deleted, error } = await supabase
		.from<SavedCharacter>('characters')
		.delete()
		.eq('id', character.id);
	console.log({ deleted, error });

	return { deleted, error };
}

export async function savePublishedCharacters(user: User, characters: Character[]) {
	const transformed: SavedCharacter[] = characters.map((character) => ({
		grid: buildGrid(character),
		name: character.name,
		id: character.id,
		owner_id: user.id,
		ownerGithubID: parseInt(user.user_metadata.provider_id)
	}));
	const { data: newCharacters, error } = await supabase
		.from<SavedCharacter>('characters')
		.upsert(transformed);
	console.log({ newCharacters, error });

	return { newCharacters, error };
}
export async function getPublishedCharacters(user: User) {
	const { data: characters, error } = await supabase
		.from<SavedCharacter>('characters')
		.select('*')
		.eq('owner_id', user.id);

	return { characters, error };
}

export async function getPublicCharacters(search = '*') {
	const { data: characters, error } = await supabase
		.from<SavedCharacter>('characters')
		.select('grid, name, ownerGithubID')
		// console.log(search);

		// is search is provided, only select the characters that contains "search"
		.ilike('name', '%' + search + '%');

	return { characters, error };
}
