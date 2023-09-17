<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createGameCode } from '$lib/game';
	import { DocumentReference, doc, setDoc } from 'firebase/firestore';
	import { firestore, user } from '$lib/firebase';
	import type { GameData } from '$lib/types';
	import { goto } from '$app/navigation';

	// $: isInvalid = $userData?.username === '';

	async function create() {
		const gameCode = createGameCode();
		const ref = doc(firestore, 'games', gameCode) as DocumentReference<GameData>;
		await setDoc(ref, {
			host: $user!.uid,
			roundMemes: {},
			phase: 'lobby'
		});
		fetch(`/${gameCode}/aiMeme`, {
			method: 'POST'
		});
		await goto(`/${gameCode}/lobby`);
	}
</script>

<Logo />

<!-- {#if $userData} -->
<!-- <div class="username">
		<label for="username">Username</label>
		<input type="text" id="username" placeholder="username" bind:value={$userData.username} />
		<p class:hidden={!isInvalid}>Username cannot be empty</p>
	</div> -->

<!-- <div class="links"> -->
<!-- <Button type="full" href="/join">Join Game</Button> -->
<Button type="full" on:click={create}>Create Game</Button>

<div />
<!-- </div> -->
<!-- {/if} -->

<!-- <style>
	.username {
		& p {
			color: red;
		}
		& p.hidden {
			opacity: 0;
		}
	}

	.links {
		display: flex;
		flex-direction: column;
	}
</style> -->
