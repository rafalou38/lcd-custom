<script lang="ts">
	import CharacterComponent from '$lib/components/character.svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { Character } from '$lib/types/character';
	import { signIn, userStore } from '$lib/supabase/auth';
	import {
		publishedCharacters,
		removePublishedCharacters,
		savePublishedCharacters
	} from '$lib/supabase/characters';
	import { curentCharacter } from '../stores/characters';
	import { copy } from '$lib/utils/object';
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

		const ids = dragSavedCharacters.map((c) => c.id);
		const removed = $publishedCharacters.filter((c) => !ids.includes(c.id));
		removed.forEach((c) => {
			removePublishedCharacters(c);
			c.published = false;
			c.saved = true;
		});

		savePublishedCharacters($userStore, e.detail.items as Character[]);
		$publishedCharacters = e.detail.items;
	}

	function open(e) {
		curentCharacter.set(copy(e.detail));
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
				<CharacterComponent {character} on:open={open} />
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
