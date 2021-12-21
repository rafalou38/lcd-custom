<script lang="ts">
	import Popup from '$lib/components/popup.svelte';
	import type { Character } from '$lib/types/character';
	import { toPNG } from '$lib/utils/grid';

	export let character: Character;
</script>

<Popup>
	<div class="p-4 h-full flex items-center justify-around">
		<div class="grow">
			<img src={toPNG(character.grid)} alt="preview of {character.name}" class="w-full crisp" />
		</div>

		<div class="grow">
			<h1>{character.name}</h1>
		</div>
	</div>
</Popup>
