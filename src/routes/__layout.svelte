<script>
	import NavBar from '$lib/components/NavBar.svelte';

	import '../app.css';
	import '$lib/supabase/client';
</script>

<NavBar />
<slot />
