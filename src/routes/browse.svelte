<script lang="ts">
	import BrowsePopup from '$lib/browse/BrowsePopup.svelte';
	import CharacterComponent from '$lib/components/character.svelte';
	import ExportPopup from '$lib/components/export/ExportPopup.svelte';
	import { currentExport } from '$lib/components/export/store';
	import Popup from '$lib/components/popup.svelte';
	import { getPublicCharacters } from '$lib/supabase/characters';
	import type { Character } from '$lib/types/character';
	import type { ExportOption } from '$lib/types/export';
	import { loadGrid } from '$lib/utils/grid';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte/internal';

	let search = '';
	let error = '';
	let loading = true;
	let results: Character[] = [];
	let selected: Character | null = null;

	async function refresh() {
		loading = true;
		let result = await getPublicCharacters(search);
		console.log(result);

		if (result.error || !result.characters) {
			error = result.error.message || 'There was an error fetching the characters';
		} else {
			error = '';
			results = result.characters.map((c) => {
				let grid = loadGrid(c);
				return {
					...c,
					saved: true,
					published: false,
					grid,
					width: grid[0].length,
					height: grid.length,
					id: Math.floor(Math.random() * 10 ** 15)
				};
			});
		}
		loading = false;
	}
	onMount(refresh);

	function select(e) {
		selected = e.detail;
	}
	function close() {
		selected = null;
	}
</script>

<input type="text" placeholder="Search" class="w-full" bind:value={search} on:change={refresh} />
{#if loading}
	<!-- loading animation -->
	<div class="w-full h-full flex justify-center items-center">
		<Icon icon="mdi:loading" class="text-4xl  animate-spin" />
	</div>
{:else if error}
	<!-- red alert containing error -->
	<div class="bg-rose-200 p-2 m-2 rounded">
		{error}
	</div>
{:else}
	<ol class="flex gap-1 flex-wrap">
		{#each results as result}
			<CharacterComponent character={result} on:open={select} />
		{/each}
	</ol>
{/if}

{#if selected}
	<BrowsePopup character={selected} on:close={close} />
	{#if $currentExport}
		<ExportPopup />
	{/if}
{/if}
