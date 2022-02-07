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
	class="w-max cursor-pointer  overflow-hidden rounded bg-gray-200"
	class:active={$curentCharacter.id == character.id}
	on:click={() => dispatch('open', character)}
>
	<div class="grid h-16 min-w-[4rem] place-items-center bg-gray-100">
		<img src={toPNG(character.grid)} alt="" class="crisp aspect-auto h-1/2" />
	</div>
	<p
		class="max-h-[4rem] max-w-[6rem] overflow-hidden overflow-ellipsis border-b-8 border-gray-200 px-2 pb-1 text-center"
	>
		{character.name}
	</p>
</li>

<style lang="postcss">
	.active {
		@apply outline outline-2 outline-black;
	}
</style>
