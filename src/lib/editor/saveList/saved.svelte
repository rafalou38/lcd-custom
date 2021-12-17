<script>
	import LocalSaved from './LocalSaved.svelte';
	import Published from './published.svelte';
</script>

<LocalSaved />
<Published />

<style>
	:global(.dragging) {
		background: #fafafa;
	}
	:global(.dragging:hover) {
		background: red;
	}
</style>
