<script lang="ts">
	import Character from '$lib/components/character.svelte';
	import { savedCharacters } from '$lib/editor/stores/characters';
</script>

<h2 class="w-full mb-2 text-gray-500 font-semibold">Saved</h2>
<ul class="flex flex-wrap gap-2">
	{#each $savedCharacters as character}
		<Character {character} />
	{:else}
		No characters saved.
	{/each}
</ul>
