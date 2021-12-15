<script lang="ts">
	import { curentCharacter } from '$lib/editor/stores/characters';

	import type { Character } from '$lib/types/character';
	import { toPNG } from '$lib/utils/grid';

	export let character: Character;

	function open() {
		curentCharacter.set(character);
	}
</script>

<li title={character.name} class="bg-gray-200 w-max rounded cursor-pointer" on:click={open}>
	<div class="grid place-items-center min-w-[4rem] h-16 bg-gray-100">
		<img src={toPNG(character.grid)} alt="" class="h-1/2 aspect-auto crisp" />
	</div>
	<p class="text-center pb-1 px-2 max-w-[6rem] overflow-x-hidden overflow-ellipsis">
		{character.name}
	</p>
</li>
