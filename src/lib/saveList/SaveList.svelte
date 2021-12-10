<script lang="ts">
	import { curentCharacter, defaultCharacter, savedCharacters } from '$lib/stores/characters';
	import type { Character } from '$lib/types/character';
	import Icon from '@iconify/svelte';

	function open(character: Character) {
		curentCharacter.set(character);
	}
	function publish(character: Character) {
		// curentCharacter.set(character);
		console.log(this);
	}
	function remove(character: Character) {
		if (confirm(`Are you sure you want to delete the character ${character.name} ?`)) {
			$savedCharacters = $savedCharacters.filter((char) => char.name !== character.name);
			$curentCharacter = defaultCharacter();
		}
	}
</script>

<h2 class="mb-2 text-gray-500 font-semibold">Saved</h2>
<ul>
	{#each $savedCharacters as character}
		<li
			class="flex gap-2 px-4 py-1  w-full bg-black/5 hover:bg-black/10   text-left transition-all group "
			on:click={open.bind(this, character)}
		>
			<span class="w-full">{character.name}</span>

			<button
				title="publish"
				class="hidden group-hover:block"
				on:click|stopPropagation={publish.bind(this, character)}
			>
				<Icon icon="mdi:cloud-upload" class="text-green" />
			</button>
			<button
				title="delete"
				class="hidden group-hover:block"
				on:click|stopPropagation={remove.bind(this, character)}
			>
				<Icon icon="mdi:delete" class="text-red" />
			</button>
		</li>
	{:else}
		No characters saved.
	{/each}
</ul>
