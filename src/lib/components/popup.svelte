<script lang="ts">
	export let classes = '';
</script>

<div class="grid place-items-center absolute inset-0 bg-black/40 backdrop-blur-[2px]">
	<div class="w-full max-w-md h-full max-h-96 bg-white rounded-md {classes}">
		<slot />
	</div>
</div>
