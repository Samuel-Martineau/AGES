<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { gameData, playersData, user } from '$lib/firebase';

	$: if ($gameData.phase === 'lead') goto('./lead');

	function next() {
		$gameData.phase = 'lead';
	}
</script>

{#if $gameData.host === $user?.uid}
	<div class="next">
		<Button on:click={next}>Next</Button>
	</div>
{/if}

<div class="meme-container">
	{#each Object.entries($gameData.roundMemes).sort( ([, { randomKey: k1 }], [, { randomKey: k2 }]) => k1.localeCompare(k2) ) as [maker, meme] (maker)}
		<!-- {#each $gameData.roundMemes as [maker, roundMeme]} -->
		<div class="meme">
			<div style="position: relative">
				<div class="center">
					<h1>
						{$playersData.find((p) => p.id == maker)?.emoji}
						<!-- <br /> -->
					</h1>
					<!-- <div class="emoji" style="--color: {$playersData.find((p) => p.id == maker)?.color};">
						{$playersData.find((p) => p.id == maker)?.emoji}
					</div> -->
					<h6>
						{$playersData.find((p) => p.id == maker)?.username}
					</h6>
				</div>
				<ul class="emojis-list top-left-emojis">
					{#each meme.guessedBy as guessedPlayerId, i}
						<!-- show at most 3 memes -->
						{#if i < 4}
							<!-- <h2>
								{$playersData.find((p) => p.id == guessedPlayerId)?.emoji}
							</h2> -->

							<div
								class="emoji"
								style="--color: {$playersData.find((p) => p.id == guessedPlayerId)?.color};"
							>
								{$playersData.find((p) => p.id == guessedPlayerId)?.emoji}
							</div>
						{/if}
					{/each}
				</ul>
				<ul class="emojist-list laugh-emojis">
					<!-- show at most 3 memes -->
					{#each [...Array(Math.min(meme.laughedBy.length, 3)).keys()] as _}
						<h2>😂</h2>
					{/each}
				</ul>
				<ul class="emojist-list vomit-emojis">
					<!-- show at most 3 memes -->
					{#each [...Array(Math.min(meme.vomitedBy.length, 3)).keys()] as _}
						<h2>🤢</h2>
					{/each}
				</ul>

				<div
					style="position: absolute; 
						background-color: {$playersData.find((p) => p.id === maker)?.color};
						opacity: 0.5;
						height: 100%;
						border-radius: 25px;
						width: 90vw;
						<!-- margin-left: 2.5dvh; -->
						margin-right: 5dvh;"
				/>
				<img src={meme.memeUrl} alt="meme" />
			</div>
		</div>
	{/each}
</div>

<!-- {/each} -->

<style>
	.next {
		position: absolute;
		left: 15px;
		bottom: 10px;
		line-height: 5px;
		z-index: 100;
	}

	/* img {
		width: 90vw;
		border-radius: 25px;
		margin-left: 2.5dvh;
		margin-right: 2.5dvh; */
	/* filter: blur(2px); */
	/* } */

	h1 {
		font-size: 128px;
	}
	/* 
	.meme-container {
		width: 90vw;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		overflow-y: auto;
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
	} */

	img {
		border-radius: 25px;
		display: block;
		width: 100%;
		box-sizing: content-box;
	}

	.meme-container {
		width: 90vw;
		gap: 25px;
		padding-bottom: 25px;
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

	.meme {
		margin-bottom: 1.5dvh; /* Add margin to separate the memes vertically */
		text-align: right;
	}

	.center {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	/* .emojis-list {
		list-style: none;
		padding: 0;
		position: absolute;
		transform: translate(-50%, -50%);
	} */

	.top-left-emojis {
		list-style: none;
		padding: 0;
		position: absolute;
		top: 110px;
		left: 60px;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.laugh-emojis {
		list-style: none;
		padding: 0;
		position: absolute;
		top: 110px;
		right: 60px;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.vomit-emojis {
		list-style: none;
		padding: 0;
		position: absolute;
		top: 110px;
		right: 20px;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.emoji {
		width: 65px;
		height: 65px;
		border-radius: 50%;
		background-color: var(--color);
		text-align: center;
		line-height: 65px;
		font-size: 45px;
	}
</style>
