<script lang="ts">
	import { gameData, user } from '$lib/firebase';
	import { getRandomColour, getRandomEmoji } from '$lib/random';
	import { faker } from '@faker-js/faker';

	// $: console.log($gameData.players);

	$: if (!$gameData.players[$user!.uid]) {
		// console.log("User doens't exist", $user!.uid, $gameData.players[$user!.uid]);
		$gameData.players[$user!.uid] = {
			username: faker.animal.cetacean(),
			color: getRandomColour(),
			emoji: getRandomEmoji(),
			score: 0
		};
	}

	let players = [
		{
			username: 'fjasldkjf',
			color: '#fad390'
		},
		{
			username: 'fjasldkjf',
			color: '#f8c291'
		},
		{
			username: 'fjasldkjf',
			color: '#82ccdd'
		},
		{
			username: 'fjasldkjf',
			color: '#b8e994'
		},
		{
			username: 'fjasldkjf',
			color: '#fad390'
		}
	];
</script>

<div class="player-list">
	{#each Object.entries($gameData.players) as [uid, player] (uid)}
		<div class="player" style="--color: {player.color};">
			{player.username}
		</div>
	{/each}
</div>

<label for="username">Username:</label>
<input
	type="text"
	placeholder="Username"
	id="username"
	bind:value={$gameData.players[$user.uid].username}
/>

<style>
	.player-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}

	.player {
		margin: 10px;
		padding: 10px;
		border-radius: 25px;
		background-color: var(--color);
		text-align: center;
	}
</style>
