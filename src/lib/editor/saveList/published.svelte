<script lang="ts">
	import CharacterComponent from '$lib/components/character.svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { Character } from '$lib/types/character';
	import { signIn, userStore } from '$lib/supabase/auth';
	import { publishedCharacters, savePublishedCharacters } from '$lib/supabase/characters';
	const flipDurationMs = 300;

	let dragSavedCharacters: Character[] = [];

	$: dragSavedCharacters = $publishedCharacters;

	function handleDndConsider(e) {
		console.log('consider');
		dragSavedCharacters = e.detail.items;
	}
	function handleDndFinalize(e) {
		console.log('finalize', e);
		dragSavedCharacters = e.detail.items;
		savePublishedCharacters($userStore, e.detail.items as Character[]);
		for
	}
</script>

<h2 class="w-full my-2 text-gray-500 font-semibold">Published</h2>
{#if $userStore}
	<ul
		class="flex flex-wrap gap-2"
		use:dndzone={{
			items: dragSavedCharacters,
			flipDurationMs,
			dropTargetClasses: ['dragging'],
			dropTargetStyle: {}
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each dragSavedCharacters as character (character.id)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<CharacterComponent {character} />
			</div>
		{:else}
			<div
				class="empty border-2 border-gray-400 border-dashed w-full p-8 rounded-lg opacity-60 pointer-events-none"
			>
				Drag here to publish
			</div>
		{/each}
	</ul>
{:else}
	<div
		class="empty border-2 border-gray-400 border-dashed w-full p-8 rounded-lg opacity-60 pointer-events-none"
	>
		You must be logged in to publish
	</div>
{/if}
<button on:click={() => signIn('github')}>LOGIN</button>
<pre>{$userStore?.id || null}</pre>
