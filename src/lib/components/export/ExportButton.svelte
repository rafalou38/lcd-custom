<script lang="ts">
	import type { Character } from '$lib/types/character';

	import type { ExportOption } from '$lib/types/export';
	import Icon from '@iconify/svelte';
	import ArduinoExportPopup from './ArduinoExportPopup.svelte';
	import { currentExport } from './store';

	let options: ExportOption[] = ['PNG', 'ARDUINO'];
	export let character: Character;
	export let current: ExportOption = 'ARDUINO';
	export let selectOpen = false;

	function startExport() {
		currentExport.set({
			character: character,
			type: current
		});
	}
</script>

<svelte:body on:click={() => (selectOpen = false)} />

<div class="relative w-max">
	<div
		class="relative flex items-center rounded-md h-10 w-max overflow-hidden bg-indigo-600"
		class:rounded-b-none={selectOpen}
	>
		<button
			class="flex items-center py-2 px-4 text-white duration-200 transition-all hover:bg-indigo-500"
			on:click={startExport}
		>
			<Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
			{current}
		</button>
		<button
			class="h-full px-2 text-white  duration-200 transition-all hover:bg-indigo-500"
			on:click|stopPropagation={() => (selectOpen = !selectOpen)}
		>
			<Icon icon="mdi:menu-down" />
		</button>
	</div>
	{#if selectOpen}
		<div class="absolute w-full flex flex-col rounded-b-md overflow-hidden">
			{#each options as option}
				<button
					class="py-2 px-4 text-white duration-200 transition-all bg-indigo-600 hover:bg-indigo-500"
					on:click={() => (current = option)}
				>
					{option}
				</button>
			{/each}
		</div>
	{/if}
</div>
