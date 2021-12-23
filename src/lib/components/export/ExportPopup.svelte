<script lang="ts">
	import ArduinoExportPopup from './ArduinoExportPopup.svelte';
	import PngExportPopupCopy from './PNGExportPopup-copy.svelte';
	import { currentExport } from './store';
</script>

{#if $currentExport}
	{#if $currentExport.type === 'ARDUINO'}
		<ArduinoExportPopup />
	{:else if $currentExport.type === 'PNG'}
		<PngExportPopupCopy />
	{/if}
{/if}
