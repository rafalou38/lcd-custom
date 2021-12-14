<script lang="ts">
	import { curentCharacter } from '$lib/editor/stores/characters';

	import Icon from '@iconify/svelte';
	import Board from './board.svelte';

	function moveGrid(x: number, y: number) {
		$curentCharacter.grid = new Array($curentCharacter.height).fill(false).map((_, i) =>
			new Array($curentCharacter.width).fill(false).map((_, j) => {
				return (
					$curentCharacter.grid[(y + i + $curentCharacter.height) % $curentCharacter.height]?.[
						(x + j + $curentCharacter.width) % $curentCharacter.width
					] ?? false
				);
			})
		);
	}
</script>

<div class="w-max mx-auto">
	<div class="grid w-max gap-2 mb-11">
		<button class="btn btn-up h-8 mx-4" on:click={moveGrid.bind(null, 0, 1)}
			><Icon icon="ic:sharp-chevron-left" rotate="90deg" /></button
		>
		<button class="btn btn-left w-8 my-4" on:click={moveGrid.bind(null, 1, 0)}
			><Icon icon="ic:sharp-chevron-left" /></button
		>

		<Board />

		<button class="btn btn-right w-8 my-4" on:click={moveGrid.bind(null, -1, 0)}
			><Icon icon="ic:sharp-chevron-right" /></button
		>
		<button class="btn btn-down h-8 mx-4" on:click={moveGrid.bind(null, 0, -1)}
			><Icon icon="ic:sharp-chevron-right" rotate="90deg" /></button
		>
	</div>
</div>

<style lang="postcss">
	.btn {
		@apply bg-blue text-white text-2xl flex justify-center items-center rounded;
	}
	.btn-up {
		grid-area: up;
	}
	.btn-left {
		grid-area: left;
	}
	.btn-right {
		grid-area: right;
	}
	.btn-down {
		grid-area: down;
	}

	.grid {
		grid-column: 3;
		grid-template-areas:
			'. up .'
			'left board right'
			'. down .';
	}
</style>
