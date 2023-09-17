<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { getRandomMemeTemplate } from '$lib/random';
	import debounce from 'debounce';
	import { firestore, user } from '$lib/firebase';
	import { DocumentReference, arrayUnion, doc, updateDoc } from 'firebase/firestore';
	import type { PageData } from './$types';
	import type { GameData } from '$lib/types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const memeTemplate = getRandomMemeTemplate();

	const boxes = new Array(memeTemplate.boxCount).fill('');

	let memeUrl: string | undefined = undefined;

	let isGenerating = false;
	$: isInvalid = boxes.some((b) => b.trim() === '');

	async function generateMeme() {
		isGenerating = true;
		const response = await fetch($page.url.pathname, {
			method: 'POST',
			body: JSON.stringify({ templateId: memeTemplate.id, boxes }),
			headers: {
				'content-type': 'application/json'
			}
		});
		memeUrl = await response.text();
		isGenerating = false;
	}
	const debouncedGenerateMeme = debounce(generateMeme, 1000);

	async function submit() {
		if (!memeUrl || !$user) return;
		const ref = doc(firestore, 'games', data.gameCode!) as DocumentReference<GameData>;
		await updateDoc(ref, {
			[`roundMemes.${$user.uid}`]: {
				memeUrl,
				guessedBy: [],
				laughedBy: [],
				vomitedBy: [],
				randomKey: Math.random().toString()
			} satisfies GameData['roundMemes'][number]
		});
		await goto(`./makeMeme/wait`);
	}
</script>

<!-- <p><a href="/wait">Meme it!</a></p> -->
<div class="container">
	<img src={memeUrl ?? memeTemplate.url} alt="meme" />

	<form>
		{#each boxes as box}
			<input
				type="text"
				placeholder="Caption goes here"
				bind:value={box}
				on:input={debouncedGenerateMeme}
			/>
		{/each}
	</form>

	<div><Button on:click={submit} disabled={isInvalid || isGenerating}>Meme it!</Button></div>
</div>

<style>
	.container {
		padding-bottom: 25px;
		display: flex;
		flex-flow: row wrap;
		height: 90dvh;
		width: 90vw;
		justify-content: center;
		gap: 25px;
		overflow-y: auto;
		margin-top: -12dvh;
		padding-top: 12dvh;
		box-sizing: border-box;
		mask-image: linear-gradient(to bottom, transparent 0%, black 15%);
		overflow-y: auto;
		/* overflow-x: hidden; */
	}

	/* * {
		justify-content: initial !important;
	} */

	img {
		width: 90vw;
		border-radius: 25px;
		/* margin-left: 2.5dvh;
		margin-right: 2.5dvh;
		margin-bottom: 2.5dvh; */
	}

	form {
		padding: 0 20px;
		display: flex;
		gap: 10px;
		flex-flow: row wrap;
	}

	input {
		width: 100%;
		/* width: 90vw; */
		/* margin-left: 2.5dvh;
		margin-right: 2.5dvh;
		margin-bottom: 2dvh; */
		line-height: 7dvh;
		cursor: pointer;
		display: inline-block;
		user-select: none;
		/* margin: 5vw; */
		transition: all 125ms ease-in-out;
		text-decoration: none;
		box-sizing: border-box;
		text-align: center;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

		&.full {
			border-radius: 15px;
			/* padding: 15px; */
		}

		&.inline {
			border-radius: 5px;
			/* padding: 6px; */
		}

		background-color: var(--dark);
		color: var(--light);

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}

		&[data-disabled='true'] {
			filter: grayscale(0.2) contrast(0.8);
			box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

			&:hover,
			&:active {
				transform: scale(1);
			}
		}
	}
</style>
