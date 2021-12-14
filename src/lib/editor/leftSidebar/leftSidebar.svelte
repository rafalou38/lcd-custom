<script lang="ts">
	import { curentCharacter } from '$lib/editor/stores/characters';

	import Icon from '@iconify/svelte';

	function invert() {
		$curentCharacter.grid = new Array($curentCharacter.height)
			.fill(false)
			.map((_, i) =>
				new Array($curentCharacter.width)
					.fill(false)
					.map((_, j) => !$curentCharacter.grid[i]?.[j] ?? false)
			);
	}
	function clear() {
		$curentCharacter.grid = new Array($curentCharacter.height)
			.fill(false)
			.map(() => new Array($curentCharacter.width).fill(false).map(() => false));
	}

	function resetSize() {
		$curentCharacter.width = 5;
		$curentCharacter.height = 8;
	}
</script>

<div class="w-max mx-auto">
	<div>
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
			<button
				class="grid place-items-center h-8 w-8 bg-red text-white rounded"
				on:click={resetSize}
			>
				<Icon icon="mdi:restore" class="text-lg" />
			</button>
		</div>
	</div>
	<div class="flex gap-1 justify-center">
		<button
			class="flex grow gap-2 justify-center items-center bg-green text-white font-bold rounded py-1 px-2"
			on:click={invert}>INVERT <Icon icon="ic:sharp-auto-fix-high" /></button
		>
		<button
			class="flex grow gap-2 justify-center items-center bg-red text-white font-bold rounded py-1 px-2"
			on:click={clear}>CLEAR <Icon icon="mdi:delete" /></button
		>
	</div>
</div>
