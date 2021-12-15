<script lang="ts">
	import Character from '$lib/components/character.svelte';
	import {
		curentCharacter,
		defaultCharacter,
		savedCharacters
	} from '$lib/editor/stores/characters';

	// function publish(character: Character) {
	// 	// curentCharacter.set(character);
	// 	console.log(this);
	// }
	// function remove(character: Character) {
	// 	if (confirm(`Are you sure you want to delete the character ${character.name} ?`)) {
	// 		$savedCharacters = $savedCharacters.filter((char) => char.name !== character.name);
	// 		$curentCharacter = defaultCharacter();
	// 	}
	// }
</script>

<h2 class="w-full mb-2 text-gray-500 font-semibold">Saved</h2>
<ul class="flex flex-wrap gap-2">
	{#each $savedCharacters as character}
		<Character {character} />
	{:else}
		No characters saved.
	{/each}
</ul>
