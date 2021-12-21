<script lang="ts">
	import { curentCharacter } from '$lib/editor/stores/characters';

	import type { Character } from '$lib/types/character';
	import { toPNG } from '$lib/utils/grid';
	import { createEventDispatcher } from 'svelte/internal';

	export let character: Character;

	const dispatch = createEventDispatcher();
</script>

<li
	title={character.name}
	class="bg-gray-200 w-max  rounded overflow-hidden cursor-pointer"
	class:active={$curentCharacter.id == character.id}
	on:click={() => dispatch('open', character)}
>
	<div class="grid place-items-center min-w-[4rem] h-16 bg-gray-100">
		<img src={toPNG(character.grid)} alt="" class="h-1/2 aspect-auto crisp" />
	</div>
	<p
		class="text-center pb-1 border-b-8 border-gray-200 px-2 max-w-[6rem] max-h-[4rem] overflow-hidden overflow-ellipsis"
	>
		{character.name}
	</p>
</li>

<style lang="postcss">
	.active {
		@apply outline outline-2 outline-black;
	}
</style>
