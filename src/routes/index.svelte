<script lang="ts">
	import Editor from '$lib/editor/editor.svelte';
	import { curentCharacter } from '$lib/editor/stores/characters';
	import Saved from '$lib/editor/saveList/saved.svelte';
	import LeftSidebar from '$lib/editor/leftSidebar/leftSidebar.svelte';
	import Save from '$lib/editor/saveList/save.svelte';

	$: $curentCharacter.grid = new Array($curentCharacter.height)
		.fill(false)
		.map((_, y) =>
			new Array($curentCharacter.width)
				.fill(false)
				.map((_, x) => $curentCharacter.grid[y]?.[x] ?? false)
		);
</script>

<div class="flex flex-col items-center">
	<div class="main flex flex-col lg:flex-row justify-around flex-wrap w-full max-w-5xl mx-auto ">
		<LeftSidebar />

		<Editor />
	</div>
	<div class="w-full max-w-5xl mx-auto">
		<Save />

		<Saved />
	</div>
</div>
