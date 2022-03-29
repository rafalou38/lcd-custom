<script>
	import Character from '$lib/components/character.svelte';

	import { userStore } from '$lib/supabase/auth';
	import Board from '../board.svelte';

	import LocalSaved from './LocalSaved.svelte';
	import Published from './published.svelte';
</script>

<LocalSaved />

<Published />
