<script lang="ts">
	import Popup from '$lib/components/popup.svelte';
	import ExportButton from '$lib/components/export/ExportButton.svelte';
	import type { Character, SavedCharacter } from '$lib/types/character';
	import { exportGridToArduino } from '$lib/utils/export';
	import { toPNG } from '$lib/utils/grid';
	import { createEventDispatcher } from 'svelte/internal';
	import Board from '$lib/editor/board.svelte';
	import type { ExportOption } from '$lib/types/export';

	export let character: SavedCharacter & Character;

	const dispatch = createEventDispatcher();

	const authorDataFetch = fetch('https://api.github.com/user/' + character.ownerGithubID).then(
		(r) => r.json()
	);
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
			<div class="flex h-full w-1/2 flex-col gap-2">
				<h1 class="mb-2 text-3xl font-bold">{character.name}</h1>
				<div class="pl-2">
					<h2 class="text-1xl font-bold">Size</h2>
					<p class="mb-4 box-content pl-4">
						width: <span class="font-semibold">{character.width}</span> height:
						<span class="font-semibold">{character.height}</span>
					</p>

					{#await authorDataFetch then author}
						<!-- promise was fulfilled -->
						{#if character.ownerGithubID}
							<h2 class="text-1xl font-bold pb-2">Author</h2>
							<a class="flex items-center gap-2 pl-4" href={author.html_url} target="_blank">
								<img src={author.avatar_url} alt={author.login} class="w-8 rounded-full" />
								<span>{author.login}</span>
							</a>
						{/if}
					{/await}
					<div />
				</div>
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
