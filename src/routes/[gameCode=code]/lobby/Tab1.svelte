<script lang="ts">
	import { gameData, user, playerData, playersData } from '$lib/firebase';
	//current round, whether started, current host
	//user id
	//player's own data, editable
	//list of all the other players, uneditable
	import PlayerList from '$lib/components/PlayerList.svelte';

	$: isInvalid = $playerData?.username === '';
</script>

<!-- <div class="player-list">
	{#each $playersData as player (player.id)}
		<div class="player" style="--color: {player.color};">
			{player.username}
		</div>
	{/each}
</div> -->
<div class="center">
	<label for="username">Username:</label>

	<input type="text" placeholder="Username" id="username" bind:value={$playerData.username} />
	<p class:hidden={!isInvalid}>Username cannot be empty</p>
</div>

<PlayerList />

<style>
	.hidden {
		opacity: 0;
	}

	p {
		color: red;
	}
	.center {
		text-align: center;
		margin: 20px;
	}
</style>
