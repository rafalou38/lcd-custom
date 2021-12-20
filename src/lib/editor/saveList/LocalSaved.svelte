<script lang="ts">
	import CharacterComponent from '$lib/components/character.svelte';
	import { savedCharacters } from '$lib/editor/stores/characters';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { copy } from '$lib/utils/object';
	import type { Character } from '$lib/types/character';
	const flipDurationMs = 300;

	let dragCharacters: Character[] = [];

	savedCharacters.subscribe((characters) => {
		console.log('savedCharacters changed', characters);

		dragCharacters = copy(characters);
	});

	function handleDndConsider(e) {
		console.log('consider');

		dragCharacters = e.detail.items;
	}
	function handleDndFinalize(e) {
		console.log('finalize');

		$savedCharacters = e.detail.items;
	}
</script>

<h2 class="w-full mb-2 text-gray-500 font-semibold">Saved</h2>
<ul
	class="flex flex-wrap gap-2"
	use:dndzone={{
		items: dragCharacters,
		flipDurationMs,
		dropTargetClasses: ['dragging'],
		dropTargetStyle: {}
	}}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each dragCharacters as character (character.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<CharacterComponent {character} />
		</div>
	{:else}
		<div class="empty  w-full p-8 rounded-lg opacity-60 pointer-events-none">
			Saved characters will appear here
		</div>
	{/each}
</ul>
