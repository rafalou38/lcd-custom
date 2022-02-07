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

<div class="mx-auto w-max">
	<div class="mb-11 grid w-max gap-2">
		<button class="btn btn-up mx-4 h-8" on:click={moveGrid.bind(null, 0, 1)}
			><Icon icon="ic:sharp-chevron-left" rotate="90deg" /></button
		>
		<button class="btn btn-left my-4 w-8" on:click={moveGrid.bind(null, 1, 0)}
			><Icon icon="ic:sharp-chevron-left" /></button
		>

		<Board />

		<button class="btn btn-right my-4 w-8" on:click={moveGrid.bind(null, -1, 0)}
			><Icon icon="ic:sharp-chevron-right" /></button
		>
		<button class="btn btn-down mx-4 h-8" on:click={moveGrid.bind(null, 0, -1)}
			><Icon icon="ic:sharp-chevron-right" rotate="90deg" /></button
		>
	</div>
</div>

<style lang="postcss">
	.btn {
		@apply flex items-center justify-center rounded bg-blue text-2xl text-white;
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
