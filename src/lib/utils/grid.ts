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

export function toPNG(grid: boolean[][]): string {
	const width = grid[0].length;
	const height = grid.length;
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (!ctx) return '';
	ctx.fillStyle = '#000';
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (grid[y][x]) {
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
	return canvas.toDataURL('image/png');
}
