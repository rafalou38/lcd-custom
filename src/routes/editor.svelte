<script lang="ts">
	import Editor from '$lib/editor/editor.svelte';
	import { curentCharacter } from '$lib/editor/stores/characters';
	import Saved from '$lib/editor/saveList/saved.svelte';
	import LeftSidebar from '$lib/editor/leftSidebar/leftSidebar.svelte';
	import Save from '$lib/editor/saveList/save.svelte';
	import { currentExport } from '$lib/components/export/store';
	import ExportPopup from '$lib/components/export/ExportPopup.svelte';

	$: $curentCharacter.grid = new Array($curentCharacter.height)
		.fill(false)
		.map((_, y) =>
			new Array($curentCharacter.width)
				.fill(false)
				.map((_, x) => $curentCharacter.grid[y]?.[x] ?? false)
		);
</script>

<svelte:head>
	<title>Create custom lcd characters - Editor</title>
	<meta
		name="description"
		content="Editor used to create custom characters for LCD displays, the characters can be exported for an arduino project or as a PNG image."
	/>
</svelte:head>

{#if $currentExport}
	<ExportPopup />
{/if}

<div class="flex flex-col items-center">
	<h1 class="my-4 text-4xl font-bold">Editor</h1>
	<div
		class="main mx-auto mt-4 flex w-full max-w-5xl flex-col flex-wrap justify-around lg:flex-row "
	>
		<LeftSidebar />

		<Editor />
	</div>
	<div class="mx-auto w-full max-w-5xl">
		<Save />

		<Saved />
	</div>
</div>
