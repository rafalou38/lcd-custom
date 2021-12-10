<script lang="ts">
	import { curentCharacter } from '$lib/stores/characters';

	let dragging = false;
</script>

<div class="board w-max border-gray-500 border-l border-t">
	{#each $curentCharacter.grid as row}
		<div class="flex">
			{#each row as pixel}
				<button
					class="w-8 h-8 border-gray-500 border-r border-b"
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
