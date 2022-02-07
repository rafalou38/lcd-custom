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

<div class="relative w-max" on:click={() => (selectOpen = false)}>
	<div
		class="relative flex h-10 w-max items-center overflow-hidden rounded-md bg-indigo-600"
		class:rounded-b-none={selectOpen}
	>
		<button
			class="flex items-center py-2 px-4 text-white transition-all duration-200 hover:bg-indigo-500"
			on:click={startExport}
		>
			<Icon icon="mdi:open-in-new" class="mr-2 h-4 w-4" />
			{current}
		</button>
		<button
			class="h-full px-2 text-white  transition-all duration-200 hover:bg-indigo-500"
			on:click|stopPropagation={() => (selectOpen = !selectOpen)}
		>
			<Icon icon="mdi:menu-down" />
		</button>
	</div>
	{#if selectOpen}
		<div class="absolute flex w-full flex-col overflow-hidden rounded-b-md">
			{#each options as option}
				<button
					class="bg-indigo-600 py-2 px-4 text-white transition-all duration-200 hover:bg-indigo-500"
					on:click={() => (current = option)}
				>
					{option}
				</button>
			{/each}
		</div>
	{/if}
</div>
