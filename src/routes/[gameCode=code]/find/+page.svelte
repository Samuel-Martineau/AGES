<!-- naive infinite scroll with #each loop -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { gameData, playersData, user, playerData } from '$lib/firebase';
	import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

	let laughedAt = '';
	let vomitedAt = '';
	let guessed = '';

	async function guess(maker: string) {
		if (maker === guessed) {
			guessed = '';
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.guessedBy`]: arrayRemove($user!.uid)
			});
		} else {
			guessed = maker;
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.guessedBy`]: arrayUnion($user!.uid)
			});
		}
	}

	async function laugh(maker: string) {
		if (maker === laughedAt) {
			laughedAt = '';
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.laughedBy`]: arrayRemove($user!.uid)
			});
		} else {
			laughedAt = maker;
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.laughedBy`]: arrayUnion($user!.uid)
			});
		}
	}

	async function vomit(maker: string) {
		if (maker === vomitedAt) {
			vomitedAt = '';
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.vomitedBy`]: arrayRemove($user!.uid)
			});
		} else {
			vomitedAt = maker;
			updateDoc(gameData.ref!, {
				[`roundMemes.${maker}.vomitedBy`]: arrayUnion($user!.uid)
			});
		}
	}

	async function submit() {
		$playerData.done = true;
		await goto('./find/wait');
	}
</script>

<div class="submit">
	<Button on:click={submit} disabled={!laughedAt || !vomitedAt || !guessed}>Submit</Button>
</div>

<div class="meme-container">
	{#each Object.entries($gameData.roundMemes).sort( ([, { randomKey: k1 }], [, { randomKey: k2 }]) => k1.localeCompare(k2) ) as [maker, meme], i (maker)}
		{#if maker !== $user?.uid}
			<div class="meme">
				<img src={meme.memeUrl} alt="meme" />
				<div class="emoji-list">
					<button on:click={() => guess(maker)} disabled={guessed !== '' && guessed !== maker}
						>🤖</button
					>
					<button on:click={() => laugh(maker)} disabled={laughedAt !== '' && laughedAt !== maker}
						>😂</button
					>
					<button on:click={() => vomit(maker)} disabled={vomitedAt !== '' && vomitedAt !== maker}
						>🤢</button
					>
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	.submit {
		position: absolute;
		left: 15px;
		bottom: 10px;
		line-height: 5px;
		z-index: 100;
	}

	img {
		border-radius: 25px;
		border-bottom-right-radius: 0;
		display: block;
		width: 100%;
		box-sizing: content-box;
	}

	.meme-container {
		width: 90vw;
		gap: 25px;
		display: flex;
		flex-wrap: wrap;
		height: 90dvh;
		overflow-y: auto;
		margin-top: -12dvh;
		padding-top: 12dvh;
		box-sizing: border-box;
		mask-image: linear-gradient(to bottom, transparent 0%, black 15%);
	}

	.meme {
		text-align: right;
		width: 100%;
	}

	.emoji-list {
		display: flex;
		justify-content: flex-end; /* Align emojis to the right */
		gap: 10px;
		padding-top: 10px;
	}

	button {
		font-size: 2.5rem;
		line-height: 2.5rem;
		height: 2.5rem;
		width: 2.5rem;
		border: none;
		background: none;
		transition: all 125ms ease-in-out;

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}

		&:disabled {
			filter: grayscale();

			&:hover,
			&:active {
				transform: scale(1);
			}
		}
	}
</style>
