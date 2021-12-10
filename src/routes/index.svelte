<script lang="ts">
	import '$lib/supabase/api';
	import Editor from '$lib/editor/editor.svelte';
	import Icon from '@iconify/svelte';
	import { curentCharacter, savedCharacters } from '$lib/editor/stores/characters';
	import Saved from '$lib/editor/saveList/saved.svelte';

	$: $curentCharacter.grid = new Array($curentCharacter.height)
		.fill(false)
		.map((_, y) =>
			new Array($curentCharacter.width)
				.fill(false)
				.map((_, x) => $curentCharacter.grid[y]?.[x] ?? false)
		);

	function save() {
		if ($curentCharacter.saved) {
			$savedCharacters = $savedCharacters.map((character) => {
				if (character.name === $curentCharacter.name) {
					return $curentCharacter;
				} else {
					return character;
				}
			});
		} else $savedCharacters = [...$savedCharacters, $curentCharacter];
	}
	const submit = function (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (event.submitter.id === 'save') {
			save();
		} else if (event.submitter.id === 'publish') {
			console.log('publish');
		}
	};
</script>

<div class="flex flex-col items-center h-full">
	<div class="flex justify-around w-full max-w-4xl mx-auto">
		<Editor />

		<div>
			<form on:submit|preventDefault={submit}>
				<p class="text-gray-500 font-semibold">Size</p>
				<div class="flex gap-4 mb-4">
					<input
						class="w-20 h-8 px-4 py-1 bg-gray-200 border-none rounded"
						id="width"
						type="number"
						bind:value={$curentCharacter.width}
					/>
					<span>x</span>
					<input
						class="w-20 h-8 px-4 py-1 bg-gray-200 border-none rounded"
						id="height"
						type="number"
						bind:value={$curentCharacter.height}
					/>
					<button class="grid place-items-center h-8 w-8 bg-red text-white rounded">
						<Icon icon="mdi:restore" class="text-lg" />
					</button>
				</div>
				<label for="name" class="text-gray-500 font-semibold">Name</label>
				<input
					class="w-full h-8 px-2 py-2 bg-gray-200 border-none rounded"
					id="name"
					type="text"
					required
					bind:value={$curentCharacter.name}
				/>
				<button
					class="flex items-center justify-center gap-2 mb-4 mt-2 w-full h-8 px-4 py-2  bg-green font-bold text-white rounded"
					type="submit"
					id="save"
				>
					SAVE <Icon icon="ic:baseline-save" class="text-lg" />
				</button>
			</form>
			<Saved />
		</div>
	</div>
</div>
