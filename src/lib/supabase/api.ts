import type { Character } from '$lib/types/character';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdkatkscfovjjsrwkulb.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk3ODE0OSwiZXhwIjoxOTU0NTU0MTQ5fQ.jiRvsO-9qxXkkOVhjQhCbHeAW63GjG5tm4p9mi7IeO0';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPublicCharacters(search = '*') {
	let { data: characters, error } = await supabase
		.from<Character>('characters')
		.select('grid, name')

		// is search is provided, only select the characters that contains "search"
		.ilike('name', search);
	console.log(
		characters.sort((a, b) => a.name.length - b.name.length),
		error
	);
}

// getPublicCharacters('%a%');
