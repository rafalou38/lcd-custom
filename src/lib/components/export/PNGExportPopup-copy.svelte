<script lang="ts">
	import Popup from '$lib/components/popup.svelte';

	import { toPNG } from '$lib/utils/grid';
	import { createEventDispatcher } from 'svelte/internal';
	import Character from '../character.svelte';
	import { currentExport } from './store';
	let imageUrl = '';

	$: imageUrl = toPNG($currentExport.character.grid);
</script>

<Popup on:close={() => currentExport.set(null)}>
	<div class="relative flex justify-center items-center p-4 h-full">
		<a href={imageUrl} target="_blank" class="w-1/2"
			><img src={imageUrl} alt="" class="w-full crisp" /></a
		>
	</div>
</Popup>
