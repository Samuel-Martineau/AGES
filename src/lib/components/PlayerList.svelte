<script>
	import { emojis, colors } from '$lib/random';
	import { playersData } from '$lib/firebase';
</script>

<div class="leaderboard">
	{#each $playersData as player (player.id)}
		<div class="emoji" style="--color: {player.color};">
			{player.emoji}
		</div>

		<div class="player" style="--color: {player.color};">{player.username}</div>
	{/each}
</div>

<style>
	.player {
		overflow-wrap: anywhere;
		/* margin: 10px; */
		padding: 10px;
		/* padding-left: 30px; */
		/* padding-right: 30px; */
		border-radius: 15px;
		background-color: var(--color);
		text-align: left;
		vertical-align: middle;
		display: flex;
		justify-content: left;
		align-items: left;
		min-height: 50px;
	}
	.leaderboard {
		display: grid;
		grid-template-columns: 60px auto;
		align-items: center;
		grid-gap: 15px;
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
