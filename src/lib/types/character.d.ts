export interface Character {
	id?: number;
	created_at?: string;
	name: string;
	grid: boolean[][];
	width: number;
	height: number;
	saved: boolean;
}
export interface SavedCharacter {
	id?: number;
	created_at?: string;
	name: string;
	grid: number[];
}
