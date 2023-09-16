<script>
	import { emojis, colors } from '$lib/random';
	import Button from './Button.svelte';

	let players = [
		{
			username: 'aasdfas',
			color: colors[0],
			score: 500,
			rank: 1,
			emoji: emojis[11]
		},
		{
			username: 'bfasdgs',
			color: colors[1],
			score: 200,
			rank: 3,
			emoji: emojis[63]
		},
		{
			username: 'chfghdf',
			color: colors[2],
			score: 300,
			rank: 2,
			emoji: emojis[43]
		},
		{
			username: 'djkljlk',
			color: colors[3],
			score: 100,
			rank: 4,
			emoji: emojis[25]
		},
		{
			username: 'edsfkasd',
			color: colors[4],
			score: 5,
			rank: 5,
			emoji: emojis[10]
		}
	];
</script>

<div class="leaderboard">
	{#each players as player}
		<div class="emoji" style="--color: {player.color};">
			{player.emoji}
		</div>

		<div class="player">{player.username}</div>
	{/each}
</div>

<Button href="">Continue</Button>

<style>
	.player {
		margin: 10px;
		padding: 10px;
		padding-left: 30px;
		padding-right: 30px;
		border-radius: 25px;
		background-color: #82ccdd;
		text-align: center;
	}
	.leaderboard {
		display: grid;
		grid-template-columns: 50px auto;
		column-gap: 50px;
		grid-gap: 10px;
		padding: 30px;
	}
	.emoji {
		margin-left: auto;
		margin-right: auto;
		padding: 10px;
		padding-left: 30px;
		border-radius: 50%;
		background-color: var(--color);
		text-align: center;
	}
</style>
