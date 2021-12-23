<script lang="ts">
	import Popup from '$lib/components/popup.svelte';
	import ExportButton from '$lib/components/export/ExportButton.svelte';
	import type { Character } from '$lib/types/character';
	import { exportGridToArduino } from '$lib/utils/export';
	import { toPNG } from '$lib/utils/grid';
	import { createEventDispatcher } from 'svelte/internal';
	import Board from '$lib/editor/board.svelte';
	import type { ExportOption } from '$lib/types/export';

	export let character: Character;

	const dispatch = createEventDispatcher();
</script>

<Popup on:close={() => dispatch('close')}>
	<div class="flex flex-col p-4 h-full">
		<div class="grow flex items-center justify-around gap-4">
			<div class="relative grow h-2/3">
				<img
					src={toPNG(character.grid)}
					alt="preview of {character.name}"
					class="mx-auto h-full crisp "
				/>
			</div>
			<div class="flex flex-col gap-2 grow h-full">
				<h1 class="font-bold text-2xl mb-2">{character.name}</h1>
				<p>
					width: <span class="font-semibold">{character.width}</span> height:
					<span class="font-semibold">{character.height}</span>
				</p>
				<!-- <pre>
					{exportGridToArduino(character.name, character.grid)}
				</pre> -->
			</div>
		</div>
		<div class="flex justify-center">
			<ExportButton {character} />
		</div>
	</div>
</Popup>
