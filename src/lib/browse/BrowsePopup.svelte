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
	<div class="flex h-full flex-col p-4">
		<div class="flex grow items-center justify-around gap-4">
			<div class="relative h-2/3 grow">
				<img
					src={toPNG(character.grid)}
					alt="preview of {character.name}"
					class="crisp mx-auto h-full "
				/>
			</div>
			<div class="flex h-full grow flex-col gap-2">
				<h1 class="mb-2 text-2xl font-bold">{character.name}</h1>
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
