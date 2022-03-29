<script lang="ts">
	import ExportButton from '$lib/components/export/ExportButton.svelte';
	import { userStore } from '$lib/supabase/auth';

	import {
		publishedCharacters,
		removePublishedCharacters,
		savePublishedCharacters
	} from '$lib/supabase/characters';

	import { copy } from '$lib/utils/object';

	import Icon from '@iconify/svelte';

	import { curentCharacter, defaultCharacter, savedCharacters } from '../stores/characters';

	function save() {
		if ($curentCharacter.saved) {
			$savedCharacters = $savedCharacters.map((character) => {
				if (character.id === $curentCharacter.id) {
					return $curentCharacter;
				} else {
					return character;
				}
			});
		} else if ($curentCharacter.published) {
			$publishedCharacters = $publishedCharacters.map((character) => {
				if (character.id === $curentCharacter.id) {
					return $curentCharacter;
				} else {
					return character;
				}
			});
			savePublishedCharacters($userStore, $publishedCharacters);
		} else {
			$curentCharacter.saved = true;

			$savedCharacters = [...$savedCharacters, copy($curentCharacter)];
		}
	}

	async function deleteCharacter() {
		let index = 0;
		if ($curentCharacter.saved) {
			$savedCharacters.forEach((character, i) => {
				if (character.id === $curentCharacter.id) {
					index = i;
				}
			});

			$savedCharacters = $savedCharacters.filter(
				(character) => character.id !== $curentCharacter.id
			);

			index = Math.min(index, $savedCharacters.length - 1);
			if ($savedCharacters[index]) {
				$curentCharacter = copy($savedCharacters[index]);
			} else {
				$curentCharacter = defaultCharacter();
			}
		} else if ($curentCharacter.published) {
			$publishedCharacters.forEach((character, i) => {
				if (character.id === $curentCharacter.id) {
					index = i;
				}
			});

			removePublishedCharacters($curentCharacter);

			$publishedCharacters = $publishedCharacters.filter(
				(character) => character.id !== $curentCharacter.id
			);

			index = Math.min(index, $publishedCharacters.length - 1);
			if ($savedCharacters[index]) {
				$curentCharacter = copy($publishedCharacters[index]);
			} else {
				$curentCharacter = defaultCharacter();
			}
		}
	}
	function duplicateCharacter() {
		$savedCharacters = [
			...$savedCharacters,
			copy($curentCharacter, {
				id: Math.floor(Math.random() * 10 ** 15),
				saved: true,
				published: false
			})
		];
	}
	function newCharacter() {
		$curentCharacter = defaultCharacter();
	}

	const submit = function (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (event.submitter.id === 'save') {
			save();
		} else if (event.submitter.id === 'delete') {
			deleteCharacter();
		} else if (event.submitter.id === 'duplicate') {
			duplicateCharacter();
		} else if (event.submitter.id === 'new') {
			newCharacter();
		}
	};
</script>

<div class="flex gap-5">
	<form on:submit|preventDefault={submit} class="w-max">
		<label for="name" class="font-semibold text-gray-500">Name</label>
		<input
			class="h-8 w-full rounded border-none bg-gray-200 px-2 py-2"
			id="name"
			type="text"
			required
			bind:value={$curentCharacter.name}
		/>
		<div class="mb-2 mt-2 flex gap-2">
			<button
				class="flex h-8 grow items-center justify-center gap-2 rounded bg-green  px-4 py-2 font-bold text-white"
				type="submit"
				id="save"
			>
				SAVE <Icon icon="ic:baseline-save" class="text-lg" />
			</button>
			{#if $curentCharacter.saved || $curentCharacter.published}
				<button
					class="flex h-8 grow items-center justify-center gap-2 rounded bg-red  px-4 py-2 font-bold text-white"
					type="submit"
					id="delete"
				>
					DELETE <Icon icon="mdi:delete" class="text-lg" />
				</button>
			{/if}
		</div>
		{#if $curentCharacter.saved || $curentCharacter.published}
			<div class="flex gap-2">
				<button
					class="mb-4 flex h-8 w-full items-center justify-center gap-2 rounded bg-blue  px-4 py-2 font-bold text-white"
					type="submit"
					id="duplicate"
				>
					DUPLICATE <Icon icon="mdi:content-duplicate" class="text-lg" />
				</button>
				<button
					class="mb-4 flex h-8 w-full items-center justify-center gap-2 rounded bg-green  px-4 py-2 font-bold text-white"
					type="submit"
					id="new"
				>
					NEW <Icon icon="mdi:content-save-edit" class="text-lg" />
				</button>
			</div>
		{/if}
	</form>
	<div class="mb-4">
		<label for="name" class="font-semibold text-gray-500">Export</label>
		<ExportButton character={$curentCharacter} />
	</div>
</div>
