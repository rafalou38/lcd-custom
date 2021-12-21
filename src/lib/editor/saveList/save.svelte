<script lang="ts">
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

	function deleteCharacter() {
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

	const submit = function (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (event.submitter.id === 'save') {
			save();
		} else if (event.submitter.id === 'delete') {
			deleteCharacter();
		} else if (event.submitter.id === 'duplicate') {
			duplicateCharacter();
		}
	};
</script>

<form on:submit|preventDefault={submit} class="w-max">
	<label for="name" class="text-gray-500 font-semibold">Name</label>
	<input
		class="w-full h-8 px-2 py-2 bg-gray-200 border-none rounded"
		id="name"
		type="text"
		required
		bind:value={$curentCharacter.name}
	/>
	<div class="flex gap-2 mb-2 mt-2">
		<button
			class="flex items-center justify-center gap-2 grow h-8 px-4 py-2  bg-green font-bold text-white rounded"
			type="submit"
			id="save"
		>
			SAVE <Icon icon="ic:baseline-save" class="text-lg" />
		</button>
		{#if $curentCharacter.saved || $curentCharacter.published}
			<button
				class="flex items-center justify-center gap-2 grow h-8 px-4 py-2  bg-red font-bold text-white rounded"
				type="submit"
				id="delete"
			>
				DELETE <Icon icon="mdi:delete" class="text-lg" />
			</button>
		{/if}
	</div>
	{#if $curentCharacter.saved || $curentCharacter.published}
		<button
			class="flex items-center justify-center gap-2 mb-4 w-full h-8 px-4 py-2  bg-blue font-bold text-white rounded"
			type="submit"
			id="duplicate"
		>
			DUPLICATE <Icon icon="mdi:content-duplicate" class="text-lg" />
		</button>
	{/if}
</form>
