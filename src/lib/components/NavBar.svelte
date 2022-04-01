<script>
	import { signIn, signout, userStore } from '$lib/supabase/auth';

	import Icon from '@iconify/svelte';
</script>

<nav class="flex w-full items-center justify-between bg-indigo-600 px-4 py-2 text-white">
	<a href="/" class="font-semibold">LCD - custom</a>
	<ul class="flex gap-1 font-medium">
		<li><a href="/editor" class="flex rounded px-2 py-1 hover:bg-indigo-700">Editor</a></li>
		<li><a href="/browse" class="flex rounded px-2 py-1 hover:bg-indigo-700">Browse</a></li>
		<li class="pl-2">
			{#if $userStore}
				<button
					class="flex items-center gap-2 rounded px-2 py-1 hover:bg-indigo-700"
					on:click={() => signout()}
					>{$userStore.user_metadata.user_name}<Icon icon="mdi:logout" /></button
				>
			{:else}
				<button
					class="flex items-center gap-2 px-2 py-1 hover:bg-indigo-700 rounded"
					on:click={() => signIn('github')}>Login <Icon icon="fa-brands:github" /></button
				>
			{/if}
		</li>
	</ul>
</nav>
