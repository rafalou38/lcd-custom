import type { Character, SavedCharacter } from '$lib/types/character';

export function loadGrid(character: SavedCharacter): boolean[][] {
	return character.grid.map((row) =>
		row
			.toString(2)
			.split('')
			.slice(1)
			.map((cell) => cell === '1')
	);
}
export function buildGrid(character: Character): number[] {
	return character.grid.map((row) =>
		parseInt(
			row.reduce((acc, cell) => acc + (cell ? 1 : 0), '1'),
			2
		)
	);
}
