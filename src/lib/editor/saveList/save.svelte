<script lang="ts">
	import Icon from '@iconify/svelte';

	import { curentCharacter, savedCharacters } from '../stores/characters';

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

<form on:submit|preventDefault={submit} class="w-max">
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
