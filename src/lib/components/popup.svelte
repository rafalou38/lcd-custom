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
	class="grid place-items-center z-10 absolute inset-0 bg-black/40 backdrop-blur-[2px]"
	on:click={close}
>
	<div
		class="relative w-full max-w-md h-full max-h-96 bg-white rounded-md {classes}"
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
