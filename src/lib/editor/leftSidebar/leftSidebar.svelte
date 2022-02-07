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

<div class="mx-auto w-max">
	<div>
		<p class="font-semibold text-gray-500">Size</p>
		<div class="mb-4 flex gap-4">
			<input
				class="h-8 w-20 rounded border-none bg-gray-200 px-4 py-1"
				id="width"
				type="number"
				bind:value={$curentCharacter.width}
			/>
			<span>x</span>
			<input
				class="h-8 w-20 rounded border-none bg-gray-200 px-4 py-1"
				id="height"
				type="number"
				bind:value={$curentCharacter.height}
			/>
			<button
				class="grid h-8 w-8 place-items-center rounded bg-red text-white"
				on:click={resetSize}
			>
				<Icon icon="mdi:restore" class="text-lg" />
			</button>
		</div>
	</div>
	<div class="flex justify-center gap-1">
		<button
			class="flex grow items-center justify-center gap-2 rounded bg-green py-1 px-2 font-bold text-white"
			on:click={invert}>INVERT <Icon icon="ic:sharp-auto-fix-high" /></button
		>
		<button
			class="flex grow items-center justify-center gap-2 rounded bg-red py-1 px-2 font-bold text-white"
			on:click={clear}>CLEAR <Icon icon="mdi:delete" /></button
		>
	</div>
</div>
