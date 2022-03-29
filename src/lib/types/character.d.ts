export interface Character {
	id: number;
	created_at?: string;
	name: string;
	grid: boolean[][];
	width: number;
	height: number;
	saved: boolean;
	published: boolean;
}
export interface SavedCharacter {
	id?: number;
	created_at?: string;
	owner_id?: string;
	name: string;
	grid: number[];
	ownerGithubID?: number;
}
export function isPublished(character: Character | SavedCharacter): character is SavedCharacter {
	return Object.prototype.hasOwnProperty.call(character, 'id');
}
