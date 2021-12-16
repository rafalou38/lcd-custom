import { browser } from '$app/env';
import { buildGrid, loadGrid } from '$lib/utils/grid';
import type { Character, SavedCharacter } from '$lib/types/character';
import { writable } from 'svelte/store';

export function defaultCharacter(): Character {
	return {
		name: '',
		grid: new Array(8).fill(false).map((_) => new Array(5).fill(false).map((_) => false)),
		width: 5,
		height: 8,
		saved: false,
		published: false,
		id: Math.floor(Math.random() * 10 ** 15)
	};
}

export const savedCharacters = writable<Character[]>([]);
export const curentCharacter = writable<Character>(defaultCharacter());
if (browser) {
	// load saved characters from local storage
	const saved: SavedCharacter[] = JSON.parse(localStorage.getItem('savedCharacters')) || [];
	const loaded: Character[] = saved.map((c) => {
		const grid = loadGrid(c);
		return {
			...c,
			saved: true,
			published: false,
			grid,
			width: grid[0].length,
			height: grid.length,
			id: Math.floor(Math.random() * 10 ** 15)
		};
	});
	savedCharacters.set(loaded);
	console.log('loaded savedCharacters', loaded);
}

let loaded = false;
savedCharacters.subscribe((characters) => {
	if (browser && loaded) {
		const saved: SavedCharacter[] = characters.map((c) => ({ name: c.name, grid: buildGrid(c) }));
		localStorage.setItem('savedCharacters', JSON.stringify(saved));

		console.log('saved', saved);
	} else loaded = true;
});
