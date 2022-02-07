<script lang="ts">
	import Popup from '$lib/components/popup.svelte';
	import { currentExport } from './store';

	import Highlight from 'svelte-highlight';
	import arduino from 'svelte-highlight/src/languages/arduino';
	import theme from 'svelte-highlight/src/styles/arduino-light';
	import { exportGridToArduino } from '$lib/utils/export';
	import Icon from '@iconify/svelte';
	let copied = false;
	function copy() {
		const textarea = document.createElement('textarea');
		textarea.value = exportGridToArduino('name', $currentExport.character.grid);
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
		copied = true;

		setInterval(() => {
			copied = false;
		}, 1000 * 2);
	}
</script>

<svelte:head>
	{@html theme}
</svelte:head>

<Popup on:close={() => currentExport.set(null)}>
	<div class="flex h-full flex-col p-4">
		<Highlight
			language={arduino}
			code={exportGridToArduino('name', $currentExport.character.grid)}
		/>
		<button
			class="flex w-full items-center justify-center gap-2 rounded bg-indigo-500 py-2 font-bold text-white "
			class:copied
			on:click={copy}
		>
			{#if copied}
				<Icon icon="mdi:check" />
				Copied!
			{:else}
				<Icon icon="mdi:content-copy" />
				copy
			{/if}
		</button>
	</div>
</Popup>

<style>
	.copied {
		background-color: #22c55e;
	}
</style>
