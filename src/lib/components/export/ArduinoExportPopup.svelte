<script lang="ts">
	import Popup from '$lib/components/popup.svelte';
	import type { Character } from '$lib/types/character';
	import { createEventDispatcher } from 'svelte/internal';
	import { currentExport } from './store';
</script>

<Popup on:close={() => currentExport.set(null)}>
	<div class="flex flex-col p-4 h-full" />
</Popup>
