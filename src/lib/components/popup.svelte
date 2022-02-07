<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte/internal';

	export let classes = '';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
</script>

<div
	class="absolute inset-0 z-10 grid place-items-center bg-black/40 backdrop-blur-[2px]"
	on:click={close}
>
	<div
		class="relative h-full max-h-96 w-full max-w-md rounded-md bg-white {classes}"
		on:click|stopPropagation={() => {}}
	>
		<button
			class="absolute top-0 left-0 m-4 text-gray-500 hover:text-gray-600 focus:text-gray-600"
			on:click={close}
		>
			<Icon icon="vaadin:close" />
		</button>
		<slot />
	</div>
</div>
