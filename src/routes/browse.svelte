<script lang="ts">
	import BrowsePopup from '$lib/browse/BrowsePopup.svelte';
	import CharacterComponent from '$lib/components/character.svelte';
	import ExportPopup from '$lib/components/export/ExportPopup.svelte';
	import { currentExport } from '$lib/components/export/store';
	import Popup from '$lib/components/popup.svelte';
	import { getPublicCharacters } from '$lib/supabase/characters';
	import type { Character, SavedCharacter } from '$lib/types/character';
	import type { ExportOption } from '$lib/types/export';
	import { loadGrid } from '$lib/utils/grid';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte/internal';

	let search = '';
	let error = '';
	let loading = true;
	let results: Character[] = [];
	let selected: (SavedCharacter & Character) | null = null;

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
					id: Math.floor(Math.random() * 10 ** 15),
					ownerGithubID: c.ownerGithubID
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

<svelte:head>
	<title>Find lcd characters made by the community</title>
	<meta
		name="description"
		content="Library of LCD characters made by the community that can be used with arduino."
	/>
</svelte:head>
<div class="mx-auto max-w-5xl px-4">
	<h1 class="my-4 text-4xl font-bold">Library</h1>

	<div class="my-4 flex">
		<input
			type="text"
			placeholder="Search"
			class=" w-full rounded rounded-r-none"
			bind:value={search}
			on:change={refresh}
		/>
		<button class="rounded rounded-l-none bg-indigo-600 px-4 py-2 text-white">Search</button>
	</div>
	{#if loading}
		<!-- loading animation -->
		<div class="flex h-full w-full items-center justify-center">
			<Icon icon="mdi:loading" class="animate-spin  text-4xl" />
		</div>
	{:else if error}
		<!-- red alert containing error -->
		<div class="bg-rose-200 p-2 m-2 rounded">
			{error}
		</div>
	{:else}
		<ol class="flex gap-2 flex-wrap">
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
</div>
