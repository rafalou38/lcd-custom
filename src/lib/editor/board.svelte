<script lang="ts">
	import { curentCharacter } from '$lib/editor/stores/characters';

	let dragging = false;
</script>

<div class="board w-max border-l border-t border-gray-500">
	{#each $curentCharacter.grid as row, y}
		<div class="flex">
			{#each row as pixel, x}
				<button
					class="h-8 w-8 border-r border-b border-gray-500"
					aria-label="grid cell at x: {x} y:{y}"
					class:active={pixel}
					on:mousedown={() => {
						dragging = true;
						pixel = !pixel;
					}}
					on:mouseup={() => {
						dragging = false;
					}}
					on:mouseenter={() => {
						if (dragging) {
							pixel = !pixel;
						}
					}}
				/>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.active {
		@apply bg-black;
		/* @apply bg-yellow-300; */
	}
	.board {
		grid-area: board;
	}
</style>
